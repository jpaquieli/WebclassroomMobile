import { IPost } from '../models/postInterface';

export class Post implements IPost {
    id?: number | undefined;
    title: string;
    content: string;
    dateTime?: Date;
    author: string;

constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
 }
}