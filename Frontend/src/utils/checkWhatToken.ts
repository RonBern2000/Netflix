import Cookies from 'js-cookie';
import { strings } from '../strings/strings';

// I know I can simplify it but I want the explicit checks
export const checkWhatToken = (): boolean => {
    if(Cookies.get(strings.auth.token)){
        return true;
    }else if(Cookies.get(strings.auth.temp)){
        return false;
    }else{
        return false;
    }
};