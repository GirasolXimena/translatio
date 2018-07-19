import React, { Component } from 'react';
import axios from '../../../node_modules/axios';

class ImageUpload extends Component {
        state = { 
            file: '',
            imagePreviewUrl: '',
            imageArray: []
         }

         componentDidMount() {
             console.log('hello');
             axios.get('/api/user/profile')
             .then(response => 
                this.setState({ 
                 imageArray: response.data[1].profile_pic
                })
            )
         }
         componentDidUpdate(prevProps, prevState) {
             console.log(this.state);
            //  let buffer = Buffer.from(this.state.imageArray, 'hex')
            //  console.log(buffer);
             
         }
    handleSubmit = (event) => {
        event.preventDefault();
        let imageData = this.state.imagePreviewUrl;
        let imageFormData = new FormData(imageData);
        // console.log(imageData);
        imageFormData.append('imageFile', imageData)
        
        axios.post('/api/user/profile', imageFormData)
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
        
        console.log('reader, file', reader, file);

        reader.readAsDataURL(file);
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
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleImageChange} />
                    <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
                </form>
                {$imagePreview}
            </div> );
    }
}
 
export default ImageUpload;