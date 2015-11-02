import Reflux from 'reflux';

var LoginActons = Reflux.createActions([
        'getLogin',
        'getLogout',
        'forgotPass',
        'changePass',
        'chkUser',
    ]);

export default LoginActons;