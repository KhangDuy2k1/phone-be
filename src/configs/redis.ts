// import { createClient } from 'redis';
// import { CustomError } from '../utils/error';
// export class Redis {
//     private client: any;
//     constructor() {
//         this.client = createClient();
//         this.client.on('error', (err: any) =>
//             console.log('Redis Client Error', err)
//         );
//     }
//     getClient = (): any => {
//         return this.client;
//     };
//     setValueRedis = async (key: string, value: any): Promise<any> => {
//         try {
//             if (!this.client.isOpen) {
//                 await this.client.connect();
//             }
//             await this.client.set(key, value);
//             if (this.client.isOpen) {
//                 await this.client.disconnect();
//             }
//         } catch (error) {
//             throw new CustomError(500, 'khong ket loi duoc voi redis');
//         }
//     };
//     getValue = async (key: string): Promise<string> => {
//         try {
//             if (!this.client.isOpen) {
//                 await this.client.connect();
//             }
//             const values: string = await this.client.get(key);
//             if (this.client.isOpen) {
//                 await this.client.disconnect();
//             }
//             return values;
//         } catch (error) {
//             throw new CustomError(500, 'khong ket loi duoc voi redis');
//         }
//     };
// }
import { createClient } from '@vercel/kv';
import { CustomError } from '../utils/error';

// const kv = createClient({
//     url: "https://rational-minnow-42298.kv.vercel-storage.com",
//     token: "AaU6ASQgMDQ5ZDZiYjgtY2M2Zi00MzgwLTg0M2ItMjExNWRlNjIwYTA4OTUyNDgzZjJiY2FiNDYxYWEyMjI4ZTM5YWQ4NWMwNjk=",
//   });

  export class Redis {
        private client: any;
        constructor() {
            this.client = createClient({
                url: "https://rational-minnow-42298.kv.vercel-storage.com",
                token: "AaU6ASQgMDQ5ZDZiYjgtY2M2Zi00MzgwLTg0M2ItMjExNWRlNjIwYTA4OTUyNDgzZjJiY2FiNDYxYWEyMjI4ZTM5YWQ4NWMwNjk=",
              });
            // this.client.on('error', (err: any) =>
            //     console.log('Redis Client Error', err)
            // );
        }
        getClient = (): any => {
            return this.client;
        };
        setValueRedis = async (key: string, value: any): Promise<any> => {
            try {
                // if (!this.client.isOpen) {
                //     await this.client.connect();
                // }
                // await this.client.set(key, value);
                // if (this.client.isOpen) {
                //     await this.client.disconnect();
                // }
                await this.client.set(key, value);
            } catch (error) {
                throw new CustomError(500, 'khong ket loi duoc voi redis');
            }
        };
        getValue = async (key: string): Promise<string> => {
            try {
                // if (!this.client.isOpen) {
                //     await this.client.connect();
                // }
                // const values: string = await this.client.get(key);
                // if (this.client.isOpen) {
                //     await this.client.disconnect();
                // }
                // return values;
                const response = await this.client.get(key)
                console.log(response);
                return response;
                
            } catch (error) {
                throw new CustomError(500, 'khong ket loi duoc voi redis');
            }
        };
    }
