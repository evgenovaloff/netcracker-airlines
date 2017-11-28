var data = {

    system: {
        host: '127.0.0.1',
        rootAPI: ''
    },

    routes: [],

    search: {
        searchPhrase: '',
        searchResults: []
    },


};

var methods = {

    // создание экземпляра XMLHTTPRequest
    createXHR: function () {
        var xhr;

        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xhr = false;
            }
        }
        if (!xhr && typeof XMLHttpRequest != 'undefined') {
            xhr = new XMLHttpRequest();
        }

        return xhr;
    },

    getRequest: function (url, xhr) {
        return new Promise(function (resolve, reject) {
            xhr.open('GET', url);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            };

            xhr.onerror = function () {
                reject(Error("Network Error"));
            };

            xhr.send();
        });
    },

    postRequest: function (url, data, headers, xhr) {
        return new Promise(function (resolve, reject) {
            xhr.open('POST', url, true);

            // TODO: проверить сравнение типов
            if (typeof headers !== 'undefined' || headers !== null) {
                headers.forEach(function (header) {
                    xhr.setRequestHeader(header.name, header.content);
                });
            }

            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            };

            xhr.onerror = function () {
                reject(Error("Network Error"));
            };

            xhr.send(data);
        });
    },

    loadData: function () {
        // категории вещей
        var apiPath = this.system.host + this.system.rootAPI;

        this.getRequest(apiPath + '/categories/?format=json', this.createXHR()).then(function (response) {
            data.general.categories = JSON.parse(response);
        }, function (httpErrorCode) {
            console.error("Ошибка получения категорий!", httpErrorCode);
        });

        this.getRequest(apiPath + '/subjects/?format=json', this.createXHR()).then(function (response) {
            data.general.subjects = JSON.parse(response);
        }, function (httpErrorCode) {
            console.error("Ошибка получения вещей!", httpErrorCode);
        });

        this.getRequest(apiPath + '/services/?format=json', this.createXHR()).then(function (response) {
            data.general.services = JSON.parse(response);
        }, function (httpErrorCode) {
            console.error("Ошибка получения сервисов!", httpErrorCode);
        });

        this.getRequest(apiPath + '/subjects-services/?format=json', this.createXHR()).then(function (response) {
            data.general.subjectsServices = JSON.parse(response);
        }, function (httpErrorCode) {
            console.error("Ошибка получения сервисов вещей!", httpErrorCode);
        });

    }


};

var vm = new Vue({
    // el: '#app',
    data: data, // данные из vue-data.js
    methods: methods // данные из vue-methods.js
});


// vm.$mount(); // монтируем VueJS в HTML