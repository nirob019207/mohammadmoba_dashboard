import { StaticImageData } from "next/image"

export interface UserInterFace {
    name: string
    email: string
    role: string
    user_status: string
    id: string
}

export interface category {
    name: string
    description:string
    id: string
    image:StaticImageData

}
export interface blog {
    title: string
    description:string
    image:StaticImageData

    id: string

}
export interface products {
    name: string
    description:string
    id: string
    image: StaticImageData;

}



export interface ConcertInterface {
    title: string
    id: string
    locationName: string
    startDate: string
    price: number
    totalTicket: number
    photos: string[]
}

export interface ComplainInterface {
    complainPhotos: string[]
    ticketId: string
    user: {
        name: string
        email: string
    }
    title: string
    id: string
    status : string
}