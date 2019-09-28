import React, { Component } from 'react';
import './Rice.css';

class Rice extends Component {
  render() {
    return (
        <div className="rice">
            <div className="body">
                <div>
                    <h1>Rice<span className="highlight-full-stop">.</span></h1>
                    <p>
                        (v.) "Rice" is a word that is commonly used to refer to making visual improvements and customizations on one's desktop.
                        It was inherited from the practice of customizing cheap Asian import cars to make them appear to be faster than they 
                        actually were - which was also known as "ricing". Here on /r/unixporn, the word is accepted by the majority of the community 
                        and is used sparingly to refer to a visually attractive desktop upgraded beyond the default.<br /><br />
                        <span style={{float: "right"}} >- /r/unixporn</span>
                    </p>
                </div>
            </div>
        </div>
    );
  }
}

export default Rice;
