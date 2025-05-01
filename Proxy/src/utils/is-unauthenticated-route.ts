
export const isAuthenticatedRoute = (path: string, arr: string[]): boolean => {
    if(arr.length === 0)  
        return false;
     return arr.some((p) => {
        if (path.startsWith(p)) {
            return true;
        }
        return false;
    });
}