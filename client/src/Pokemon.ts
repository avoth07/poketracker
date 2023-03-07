export class Pokemon {
    name!: string;
    dex_number!: number;
    type_1!: string;
    type_2!: string | null;
    image_url!: string;
  
    constructor(name: string, dex_number: number, type_1: string, type_2: string | null, image_url: string, isCaught: boolean) {
      this.name = name;
      this.dex_number = dex_number;
      this.type_1 = type_1;
      this.type_2 = type_2;
      this.image_url = image_url;
    }
}