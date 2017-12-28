import { Blog} from './blog';

export interface ResultsToBlog {
    (result : Blog[]) : void;
}
export interface OneResultToBlog {
    (result : Blog) : void;
}