import React, { Component } from 'react'

class Form extends Component {

    constructor(props) {
        super(props);

        // variables for storing informations
        this.state = {
            errmsg: '',
            fname: '',
            lname: '',
            email: '',
            date: '',
            kraj: 'Hlavní město Praha',
            checkbox: false,
            longtext: ''
        };

        this.saveForm = this.saveForm.bind(this);
        this.loadForm = this.loadForm.bind(this);
        this.isValidSave = this.isValidSave.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.isValidLoad = this.isValidLoad.bind(this);
    }

    // methods for storing values into variables from form
    handleFname = (event) => {
        this.setState({
            fname: event.target.value
        });
    }

    handleLname = (event) => {
        this.setState({
            lname: event.target.value
        });
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleDate = (event) => {
        this.setState({
            date: event.target.value
        });
    }

    handleKraj = (event) => {
        this.setState({
            kraj: event.target.value
        });
    }

    handleCheckbox = (event) => {
        this.setState({
            checkbox: event.target.checked
        });
    }

    handleLongText = (event) => {
        this.setState({
            longtext: event.target.value
        });
    }

    // method for checking if input is valid and storing into JSON
    saveForm = (event) => {
        //find out if input is valid
        if(this.isValidSave()) {
            // je to v poradku
            // vytvorime object pro JSON
            var obj = {
                "firstName": this.state.fname,
                "lastName": this.state.lname,
                "email": this.state.email,
                "date": this.state.date,
                "kraj": this.state.kraj,
                "checkedReact": this.state.checkbox
            };

            // create JSON object and clear form
            this.setState({
                // object transfer into JSON string and formatting
                longtext: JSON.stringify(obj, null, 4),
                fname: '',
                lname: '',
                email: '',
                date: '',
                kraj: 'Hlavní město Praha',
                checkbox: false,
            }, () => {console.log(`longtext: ${typeof(this.state.longtext)}`)});
            

        } else {
            // clear longtext
            this.setState({
                longtext: ''
            });
        }

    }

    // method for checking if input form files are valid
    isValidSave () {
        //alert("lets check");
        if((this.state.fname === "") || (this.state.lname === "") || (this.state.email === "") || (this.state.date === "")) {
            this.setState({
                errmsg: "Prosím vyplňte všechny políčka."
            }, () => {alert(`ERROR: ${this.state.errmsg}`);});
            
            return false;
        }

        //validate email
        if (this.validateEmail()) {
            // email is ok
            return true;
        } else {
            this.setState({
                errmsg: "Prosim zadejte validni email."
            }, () => {alert(`ERROR: ${this.state.errmsg}`);});
            return false;
        }
    }

    // method for validating email address using regex
    validateEmail () {
        var re = /\S+@\S+\.\S+/;
        return re.test(this.state.email);
    }

    // method for checking longtext input and validing
    loadForm = (event) => {
        if (this.isValidLoad() === true) {
            // validni vstup
            //console.log('validni vstup');
            var jsonObj = JSON.parse(this.state.longtext);
            this.setState({
                fname: jsonObj.firstName,
                lname: jsonObj.lastName,
                email: jsonObj.email,
                date: jsonObj.date,
                kraj: jsonObj.kraj,
                checkbox: jsonObj.checkedReact,
                longtext: ''
            })
        } else {
            // nevalidni vstup
            //console.log('invalidni vstup');
            return;
        }
    }

    isValidLoad() {
        //JSON string into JS object
        if (this.state.longtext === '') {
            this.setState({
                errmsg: "Zadejte požadovaný JSON formát",
            }, () => {alert(`ERROR: ${this.state.errmsg}`);});

            return false;
        }

        // try to parse JSON into object
        try {
            var jsonObj = JSON.parse(this.state.longtext);
        } catch (error) {
            this.setState({
                errmsg: "Zadejte požadovaný JSON formát",
            }, () => {alert(`ERROR: ${this.state.errmsg}`);});

            return false;
        }

        // now validate if there are keys we need
        if(!("firstName" in jsonObj) || !("lastName" in jsonObj) || !("email" in jsonObj) || !("date" in jsonObj) || !("kraj" in jsonObj) || !("checkedReact" in jsonObj)) {
            this.setState({
                errmsg: "Některý/é klíč/e chybí",
            }, () => {alert(`ERROR: ${this.state.errmsg}`);});

            return false;
        }

        // check kraj
        var kraje = [
            "Hlavní město Praha", 
            "Středočeský kraj",
            "Jihočeský kraj",
            "Plzeňský kraj",
            "Karlovarský kraj",
            "Ústecký kraj",
            "Liberecký kraj",
            "Královéhradecký kraj",
            "Pardubický kraj",
            "Kraj Vysočina",
            "Jihomoravský kraj",
            "Olomoucký kraj",
            "Zlínský kraj",
            "Moravskoslezký kraj"
        ]
        if (!(kraje.includes(jsonObj.kraj))) {
            this.setState({
                errmsg: "Špatný kraj.",
            }, () => { alert(`ERROR: ${this.state.errmsg}`);});

            return false;
        }

        // check checkbox
        if ((jsonObj.checkedReact !== true) && (jsonObj.checkedReact !== false)) {
            this.setState({
                errmsg: "Špatna checkbox hodnota.",
            }, () => {alert(`ERROR: ${this.state.errmsg}`);});

            return false;
        }

        // check email valid
        var re = /\S+@\S+\.\S+/;
        if (re.test(jsonObj.email) === false) {
            this.setState({
                errmsg: "Špatný formát emailu.",
            }, () => {alert(`ERROR: ${this.state.errmsg}`);});

            return false;
        }

        // check values inside JSON
        if ((jsonObj.firstName === "")||(jsonObj.lastName === "")||(jsonObj.date === "")) {
            this.setState({
                errmsg: "Špatný JSON Formát.",
            }, () => {alert(`ERROR: ${this.state.errmsg}`);});

            return false;
        }

        // input is valid
        return true;
    }

    // rendering our form
    render() {
        return (
            <form>
                <section>
                <div className="left_float">
                    <label htmlFor="fname">Jméno</label>
                    <input id="fname" type="text" value={this.state.fname} onChange={this.handleFname} name="firstname" />
                </div>
                <div className="right_float">
                    <label htmlFor="lname">Příjmení</label>
                    <input id="lname" type="text" value={this.state.lname} onChange={this.handleLname} name="lastname" />
                </div>
                <div className="left_float">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="email" value={this.state.email} onChange={this.handleEmail} name="email" />
                </div>
                <div className="right_float">
                    <label htmlFor="birth">Datum narození</label>
                    <input id="birth" type="date" value={this.state.date} onChange={this.handleDate} name="birth" />
                </div>
                </section>

                <section>
                    <label htmlFor="kraj">Kraj</label>
                    <select name="kraj" id="kraj" value={this.state.kraj} onChange={this.handleKraj}>
                        <option>Hlavní město Praha</option>
                        <option>Středočeský kraj</option>
                        <option>Jihočeský kraj</option>
                        <option>Plzeňský kraj</option>
                        <option>Karlovarský kraj</option>
                        <option>Ústecký kraj</option>
                        <option>Liberecký kraj</option>
                        <option>Královéhradecký kraj</option>
                        <option>Pardubický kraj</option>
                        <option>Kraj Vysočina</option>
                        <option>Jihomoravský kraj</option>
                        <option>Olomoucký kraj</option>
                        <option>Zlínský kraj</option>
                        <option>Moravskoslezký kraj</option>
                    </select>
                <label>REACT</label>
                <input id="react" type="checkbox" value={this.state.checkbox} checked={this.state.checkbox} onChange={this.handleCheckbox} name="react" />
                <br />
                </section>

                <section>
                <div className="left_btn">
                    <input id="save" type="button" value="Uložit" onClick={this.saveForm} name="save" />
                </div>
                <div className="right_btn">
                    <input id="load" type="button" value="Načíst" onClick={this.loadForm} name="load" />
                </div>
                <textarea name="" id="" cols="30" rows="10" value={this.state.longtext} onChange={this.handleLongText} />
                </section>
            </form>
        );
    }
}

export default Form