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
    var time = currentDate.getTime();
    var date = pad(currentDate.getDate());
    var month = pad(currentDate.getMonth() + 1); 
    var year = currentDate.getFullYear();
    return `${date}-${month}-${year}-${time}-${filename}`
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

        // editor.model.document.on( 'change:data', () => {
        //     console.log( 'The data has changed!' );
        // } );

        $('form.editor').on( 'submit', event => {
            event.preventDefault();
            // let login = window.prompt("Username: ");
            // let password = window.prompt("Password: ");
            // let token = btoa(`${login}:${password}`);
            let token = window.prompt("Token: ");
            
            let headers = {
                Accept: 'application/vnd.github.v3+json',
                // Authorization: `Basic ${token}`
                Authorization: `token ${token}`
            }

            var serialize = {}
            $(event.target).serializeArray().forEach(prop => {
                serialize[prop.name] = prop.value;
            })

            let filename = makeFileName(serialize.title);
            
            var image = $("#image")[0].files[0];
            var extension = image.type.split('/').slice(-1)[0];
            var fr = new FileReader();
            fr.readAsDataURL(image);
            fr.onload = () => {
                $.ajax({
                    type: "PUT",
                    url: `https://api.github.com/repos/datle2225/datle2225.github.io/contents/${CONSTANT.FOLDER}/${CONSTANT.IMAGES_PATH}/${filename}.${extension}`,
                    data: JSON.stringify({
                        "message": `Push image ${filename}.${extension}`,
                        "content":  fr.result.split(',').slice(-1)[0]
                    }),
                    headers: headers,
                    success: function (response) {
                        console.log(response);
                    }
                });
            };

            $.ajax({
                type: "PUT",
                url: `https://api.github.com/repos/datle2225/datle2225.github.io/contents/${CONSTANT.FOLDER}/${CONSTANT.ARTICLES_PATH}/${filename}.html`,
                data: JSON.stringify({
                    "message": `Push article ${filename}`,
                    "content":  btoa(unescape(encodeURIComponent(editor.data.get())))
                }),
                headers: headers,
                success: function (response) {
                    console.log(response);
                    var newUrl = window.location.href.split('/');
                    newUrl[newUrl.length - 1] = `${CONSTANT.ARTICLES_PATH}/${filename}.html`;
                    window.location.href = newUrl.join('/');
                }
            });
        });
    } )
    .catch( error => {
        console.error( error );
    } );


