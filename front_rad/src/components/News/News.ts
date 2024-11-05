
export interface News {

    id?: string;

    title: string;

    description: string;

    content: string;

    url: string;

    publishedAt: Date;

    source: {

        name: string;

        url: string;

    };

}
