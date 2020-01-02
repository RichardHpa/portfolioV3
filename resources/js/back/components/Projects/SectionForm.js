import React, { Component } from 'react';

import { Editor, EditorState , RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import MediaModal from '../Media/MediaModal';
import CustomEditor from '../Editor/CustomEditor';

class SectionForm extends Component {
    constructor () {
      super()
      this.state = {
          media: {
              id: null
          }
      }

      this.getImage = this.getImage.bind(this);
    }


    getImage(id){
        const {editorText} = this.state;
        axios.get(`/api/media/${id}`).then(response => {
            this.setState({
                media: response.data
            })
            // this.props.editedContent({
            //     imageID: response.data['id'],
            //     text: editorText
            // });
        })
    }

    handleChangeEditor(text){

    }

    render () {
        const {media, focused}  = this.state;
        return (
            <div className="form-row pt-3 sectionRow">
                <div className="col-12 col-md-6 imgSection">
                    <div className="card h-100 d-flex justify-content-center align-items-center p-2">
                        {media['id'] ?
                            <img alt="Crop" className="img-fluid" src={`/images/uploads/thumbnails/${media.media_name}.jpg`} />
                        :
                        <MediaModal
                            sendImage={this.getImage}
                            btnText='Add Image'
                            btnType='dashed'
                        />
                        }
                    </div>
                </div>
                <div className='col-12 col-md-6 textSection'>
                    <CustomEditor
                        changeEditor={this.handleChangeEditor}
                    />
                </div>
            </div>
        )
    }

}
export default SectionForm;
