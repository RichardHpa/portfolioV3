import React, { Component } from 'react';
import { Editor, EditorState , RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import MediaModal from '../Media/MediaModal';

class SectionForm extends Component {
    constructor () {
      super()
      this.state = {
          editorState: EditorState.createEmpty(),
          editorText: '',
          media: {
              id: null
          }
      }

      this.onBoldClick = this.onBoldClick.bind(this);
      this.onUnderlineClick = this.onUnderlineClick.bind(this);
      this.onItalicClick = this.onItalicClick.bind(this);
      this.getImage = this.getImage.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    onChange(editorState){
        const {media} = this.state;
        this.setState({
            editorState: editorState,
            editorText: stateToHTML(this.state.editorState.getCurrentContent())
        })
        this.props.editedContent({
            imageID: media['id'],
            text: stateToHTML(this.state.editorState.getCurrentContent())
        })
    }

    getImage(id){
        const {editorText} = this.state;
        axios.get(`/api/media/${id}`).then(response => {
            this.setState({
                media: response.data
            })
            this.props.editedContent({
                imageID: response.data['id'],
                text: editorText
            });
        })
    }

    onUnderlineClick(e){
        e.preventDefault();
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }

    onBoldClick(e){
        e.preventDefault();
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }

    onItalicClick(e){
        e.preventDefault();
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    render () {
        const {media}  = this.state;
        return (
            <div className="row pt-3 sectionRow">
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
                <div className="col-12 col-md-6 textSection">
                    <button onClick={this.onUnderlineClick}>U</button>
                    <button onClick={this.onBoldClick}><b>B</b></button>
                    <button onClick={this.onItalicClick}><em>I</em></button>
                    <Editor
                      editorState={this.state.editorState}
                      placeholder="Write about this section"
                      onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }

}
export default SectionForm;
