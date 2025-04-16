function LoggedInName() {
    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = "";
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    
    function doLogout(event: any): void {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
    };
    return (
        <div id="loggedInDiv">
            <span id="userName">{firstName} {lastName}</span><br />
            
        </div>
    );
};

export default LoggedInName;


