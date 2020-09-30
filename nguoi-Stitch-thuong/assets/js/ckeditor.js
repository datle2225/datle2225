class Adapter {
    constructor(loader) {
        this.loader = loader;
        this.file = null;
    }

    upload() {
        return new Promise((resolve, reject) => {
            const reader = this.reader = new window.FileReader();

            reader.addEventListener('load', () => {
                this.loader.uploadTotal = this.loader.uploaded = this.file.size;
                resolve({ default: reader.result });
            });

            reader.addEventListener('error', err => {
                this.file = null;
                reject(err);
            });

            reader.addEventListener('abort', () => {
                this.file = null;
                reject();
            });

            this.loader.file.then(file => {
                this.file = file;
                reader.readAsDataURL(this.file);
            });
        });
    }

    abort() {
        this.reader.abort();
    }
}

function UploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
        return new Adapter(loader);
    };
}

function makeData(element) {
    let data = {};
    $(element).serializeArray().forEach(prop => {
        data[prop.name] = prop.value;
    })
    return data;
}

function makeFileName(title) {
    let filename = title ? title.toLowerCase().replaceAll(' ', '-') : 'test';
    var currentDate = new Date();
    var date = pad(currentDate.getDate());
    var month = pad(currentDate.getMonth() + 1); 
    var year = currentDate.getFullYear();
    return `${date}-${month}-${year}-${filename}`
}

function pad(n) {
    return n<10 ? '0'+n : n;
}

DecoupledEditor
    .create( document.querySelector( '#editor' ), {
        extraPlugins: [ UploadAdapterPlugin ],

        // ...
    } )
    .then( editor => {
        const toolbarContainer = document.querySelector( '#toolbar-container' );
        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
        
        // $('.button').on('click', () => {
        //     console.log('submit')
        //     console.log(btoa(editor.data.get()))
        // })
        // editor.model.document.on( 'change:data', () => {
        //     console.log( 'The data has changed!' );
        // } );
        $('form.editor').on( 'submit', event => {
            event.preventDefault();
            let login = window.prompt("Username: ");
            let password = window.prompt("Password: ");
            let token = btoa(`${login}:${password}`)
            let headers = {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Basic ${token}`
            }

            var serialize = {}
            $(event.target).serializeArray().forEach(prop => {
                serialize[prop.name] = prop.value;
            })
            let filename = makeFileName(serialize.title);

            var data = {
                "message": `Push file ${filename}.html`,
                "content":  btoa(editor.data.get())
            }

            $.ajax({
                type: "PUT",
                url: `https://api.github.com/repos/datle2225/datle2225.github.io/contents/nguoi-Stitch-thuong/${filename}.html`,
                data: "data",
                headers: headers,
                success: function (response) {
                    
                }
            });
        });
    } )
    .catch( error => {
        console.error( error );
    } );


