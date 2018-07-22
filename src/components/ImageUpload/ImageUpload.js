import React, { Component } from 'react';
import axios from '../../../node_modules/axios';

class ImageUpload extends Component {
        state = { 
            file: '',
            imagePreviewUrl: '',
            imageArray: [],
            imageFromServer: ''
         }

         componentDidMount() {
             console.log('hello');
             axios.get('/api/user/profile')
             .then(response => 
                this.setState({ 
                 imageArray: response.data[1].profile_pic
                })
            )
            let chunk = this.state.imageArray
            console.log(chunk);
   
            
            const objJsonStr = JSON.stringify(chunk); 
            console.log(objJsonStr);
            
            const objJsonB64 = new Buffer(objJsonStr).toString("base64");
            console.log(objJsonB64);
            
            this.setState({ 
                imageFromServer: objJsonB64 });
            
         }
         componentDidUpdate(prevProps, prevState) {
             console.log(this.state);
            //  let buffer = Buffer.from(this.state.imageArray, 'hex')
            //  console.log(buffer);
                // img.src = imageUrl
                // console.log(imageUrl);
                
                
                // let textChunk = chunk.toString('utf8');
            //    console.log(textChunk);
               
                // process utf8 text chunk
         
             
         }
    handleSubmit = (event) => {
        event.preventDefault();
        let file = this.state.file;
        // let imageFormData = new FormData(imageData);
        // // console.log(imageData);
        // imageFormData.append('imageFile', imageData)
        console.log('sending file', file);
        
        axios.post('/api/user/profile', file)
    }

    handleImageChange = (event) => {
        event.preventDefault();
        
        const reader = new FileReader();
        const file = event.target.files[0];

        // var reader2 = new FileReader();
        // reader2.onloadend = readSuccess;                                            
        // function readSuccess(event) { 
        //     console.log('taco!')                               
        // };
        // reader.readAsText(file);  
        
        console.log('reader',file);
        this.setState({ 
            file: file
         });
        // reader.readAsDataURL(file);
        reader.onloadend = (event) => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            })
            console.log(reader);
            console.log('loading ended');
            
            // reader.readAsDataURL(file);
            console.log('image', this.state);
        }        
    }




    
    render() { 
        let $imagePreview = null;
        
        
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<img src={this.state.imagePreviewUrl} alt = {''} />);
            console.log('$imagepreview', $imagePreview);
            
        }
        else {
            $imagePreview = 
            (<div className="previewText">
                Please select an Image for Preview

            {/* <p>{JSON.stringify(this.state.imageArray.data)}</p> */}
            {/* <img src={`data:image/jpeg;base64,${this.state.imageArray.data}`} /> */}

            </div>);
        }

        return (
            <div>
        <form action="/upload" enctype="multipart/form-data" method="POST"> 
        <input type="file" name="photo" />
        <input type="submit" value="Upload Photo"/>
        </form>
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleImageChange} />
                    <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
                </form>
                {$imagePreview}
            </div> );
    }
}
 
export default ImageUpload;