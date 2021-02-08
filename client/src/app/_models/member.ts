import { Photo } from "./photo";

 export interface Member {
        id: number;
        username: string;
        photoUrl: string;
        age: number;
        created: Date;
        lastActive: Date;
        introduction: string;
        lookingFor: string;
        gender: string;
        knownAs: string;
        interests: string;
        city: string;
        country: string;
        photos: Photo[];
    }


