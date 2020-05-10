var app = new Vue({
    el: '#app',
    data: {
        SERVER_TEMP:{
            'SERVER_URL': '',
            'SERVER_PORT': '',
        },
        SERVER_DATA:{
            'SERVER_URL': '',
            'SERVER_PORT': '',
            'SERVER_STATUS': false,
            'SERVER_CONDITIONS': {'OFF': 'ОТКЛЮЧЕН', 'ON':'АКТИВЕН'},
        },
        SERVER_DEF:{
            'def_URL': 'http://localhost',
            'def_PORT': '8085'
        },
        CAMERA_TEMP:{
            'CamName':'',
            'CamLogin':'',
            'CamPassword':'',
            'CamIP':'',
            'CamDescription':''
        },

        show_server_options: false,
        show_camera_options: false,
    },
    methods: {
        get_server_status: function () {
            console.log('URL - ' + this.SERVER_DATA.SERVER_URL+':'+this.SERVER_DATA.SERVER_PORT+"/servercommand?status");
            axios
                .get(this.SERVER_DATA.SERVER_URL+':'+this.SERVER_DATA.SERVER_PORT+"/servercommand?status")
                .then(response => (this.SERVER_DATA.SERVER_STATUS = response.status == 200))
                .catch(error => console.log(error), this.SERVER_DATA.SERVER_STATUS = false)
        },
        set_update: function () {
            this.show_server_options = true;
            this.SERVER_TEMP.SERVER_URL = this.SERVER_DATA.SERVER_URL;
            this.SERVER_TEMP.SERVER_PORT = this.SERVER_DATA.SERVER_PORT;
        },
        save_update: function () {
            this.show_server_options = false;
            this.SERVER_DATA.SERVER_URL = this.SERVER_TEMP.SERVER_URL;
            this.SERVER_DATA.SERVER_PORT = this.SERVER_TEMP.SERVER_PORT;

            localStorage.SERVER_URL = this.SERVER_DATA.SERVER_URL;
            localStorage.SERVER_PORT = this.SERVER_DATA.SERVER_PORT;

            this.get_server_status();
        },
        show_camera_info: function (add) {
            if (!add) {
                this.get_saved_camera_info();
            }

            this.show_camera_options = true;
        },
        check_camera_connection: function () {

        },
        get_saved_camera_info: function () {

        }
    },
    mounted() {
        if (localStorage.SERVER_URL && localStorage.SERVER_URL != 'undefined') {
            this.SERVER_DATA.SERVER_URL = localStorage.SERVER_URL;
        }
        else
        {
            this.SERVER_DATA.SERVER_URL = this.SERVER_DEF.def_URL;
            localStorage.SERVER_URL = this.SERVER_DEF.def_URL;
            console.log('set default URL - ' + this.SERVER_DEF.def_URL);
        }
        if (localStorage.SERVER_PORT && localStorage.SERVER_PORT != 'undefined') {
            this.SERVER_DATA.SERVER_PORT = localStorage.SERVER_PORT;
        }
        else
        {
            this.SERVER_DATA.SERVER_PORT = this.SERVER_DEF.def_PORT;
            localStorage.SERVER_PORT = this.SERVER_DEF.def_PORT;
            console.log('set default PORT - ' + this.SERVER_DEF.def_PORT);
        }

        this.get_server_status();
    },
    created() {

    }
});