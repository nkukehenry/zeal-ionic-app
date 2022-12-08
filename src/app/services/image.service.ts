import { Injectable } from '@angular/core';
import { Camera, CameraResultType,Photo,CameraSource } from '@capacitor/camera';
import { Filesystem,Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { ActionSheet, ActionSheetOptions } from '@awesome-cordova-plugins/action-sheet/ngx';


const IMAGE_DIR = "zeal-images";

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  constructor(private platform:Platform,private imagePicker: ImagePicker,private actionSheet: ActionSheet) { 

  }

  ngOnInit() {}

  async getPhoto(){

  let buttonLabels = ['From Gallery', 'Take Photo'];

  const options: ActionSheetOptions = {
    title: 'Where do you want to pick your image from?',
    subtitle: 'Choose image source',
    buttonLabels: buttonLabels,
    addCancelButtonWithLabel: 'Cancel'
  }

  let buttonIndex = await this.actionSheet.show(options);

  console.log('choice',buttonIndex);

  return (buttonIndex==1)?this.getGalleryPhoto():this.getCameraPhoto();

  }

  async getGalleryPhoto(){

    
    const options = {
      quality:90,
      outputType:1,
      maximumImagesCount:1
    };
    
     let picked_images= await this.imagePicker.getPictures(options);

    return new Promise(async (resolve,reject)=>{

      console.log('picture',picked_images);
      
          if(!picked_images)
            reject("Unable to get image");
            resolve( picked_images[0]);
       

     });
   
  }

  async getCameraPhoto(){

    const image = await Camera.getPhoto({
      source:CameraSource.Camera,
      quality:90,
      resultType:CameraResultType.Uri,
      allowEditing:false,
    });

    return new Promise(async (resolve,reject)=>{

      if(!image)
        reject("Unable to get image");

        resolve( await this.saveImage(image));
     });

    }


  async saveImage(photo: Photo){

    const fileName = new Date().getTime()+'.jpeg';
    const base64Image = await this.getBase64Image(photo);

    return base64Image;

    // const savedFile =  await Filesystem.writeFile({
    //   directory: Directory.Data,
    //   path: `${IMAGE_DIR}/${fileName}`,
    //   data: base64Image
    // });

  }

  async getBase64Image(photo: Photo){

    if(this.platform.is('hybrid')){
      const file_path = photo.path as string;
      const file = await Filesystem.readFile({path: file_path});
      return file.data;

    }
    else{

      const file_path = photo.webPath as string;
      const response = await fetch(file_path);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;

    }

  }

  convertBlobToBase64(blob:Blob){

    return new Promise( (resolve,reject)=>{

      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload=()=>{
          resolve(reader.result);
      }
      reader.readAsDataURL(blob);
    });

  }

 base64toBlob(b64Data:string, contentType='jpeg', sliceSize=512){

    b64Data=b64Data.replace('data:image/png;base64,','');

    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

}
