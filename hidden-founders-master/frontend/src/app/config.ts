import { PaginationOptionsHolder, Shop } from "./entities";


//App configuration
export const UNLOGED_PATH:Array<string> =['/login', '/register'] ;
export const LOGED_PATH:Array<string> = ['/shops', '/nearby', '/prefered'] ;
export const DEFAULT_PAGINATION_OPTIONS:PaginationOptionsHolder = new PaginationOptionsHolder(
    0,
    100, 
    10, 
    [5, 10, 25, 50]
);

//Web service paths :
export const BASE_URL:string = "http://localhost:8080/" ;
export const LOGIN_PATH:string        = "login";
export const REGISTER_PATH:string     = "register";
export const CHECK_TOKEN_PATH:string  = "checktoken";
export const USER_DETAILS_PATH:string = "user_details";
export const SHOPS_PATH:string        = "shop" ;
export const LIKE_SHOP_PATH:string    = "shop/like/" ;
export const UNLIKE_SHOP_PATH:string  = "shop/unlike/";
export const PREF_SHOP_PATH:string    = "shop/prefered";


//Storage items :
export const USER_ITEM  = "user" ;
export const TOKEN_ITEM = "token" ;

//tmp to remove after tests 
export const MOCKED_SHOPS:Array<Shop> =
[
    new Shop('1','http://placehold.it/150x150','totto', 'toto@gmail.com','Toto', null),
    new Shop('1','http://placehold.it/150x150','totto', 'toto@gmail.com','Toto', null),
    new Shop('1','http://placehold.it/150x150','totto', 'toto@gmail.com','Toto', null),
    new Shop('1','http://placehold.it/150x150','totto', 'toto@gmail.com','Toto', null),
    new Shop('1','http://placehold.it/150x150','totto', 'toto@gmail.com','Toto', null)
]; 