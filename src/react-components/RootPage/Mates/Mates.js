import React from 'react';
import './Mates.css';

import ViewportPaginationView from '../ViewportPaginationView/ViewportPaginationView';
import '../ViewportPaginationView/ViewportPaginationView.css';
import Carousel from '../../Carousel/Carousel';
import FocusableImageCarouselTile from '../../Carousel/FocusableImageCarouselTile/FocusableImageCarouselTile';
import SimpleTextCarouselTile from '../../Carousel/SimpleTextCarouselTile/SimpleTextCarouselTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


import IndexIndicator from '../ViewportPaginationView/IndexIndicator/IndexIndicator';

class Mates extends ViewportPaginationView {

	hashes = ["", "buster-photos"]

	busterPhotos = [
		{
            name: "Buster",
            filePath: "/assets/mates/buster-ready-freddie-smaller.jpg",
            caption: "Buster gazing longfully at me (off frame) in his trademark ready freddie t-shirt"
		},
		{
            name: "Buster",
            filePath: "/assets/mates/buster-diy-expert-smaller.jpg",
            caption: "Buster is a master of all things DIY!"
		},
		{
            name: "Buster",
            filePath: "/assets/mates/buster-cool-hat-smaller.jpg",
            caption: "Buster and his cool hat!"
		},
		{
            name: "Buster",
            filePath: "/assets/mates/buster-cool-cat-smaller.jpg",
            caption: "Buster and his cool cat!"
		},
		{
            name: "Buster",
            filePath: "/assets/mates/buster-disc-golf-smaller.jpg",
            caption: "intense disc gold game"
		},
		{
            name: "Buster",
            filePath: "/assets/mates/buster-meets-his-hero-smaller.jpg",
            caption: "Buster meets his hero! (Simon Dallow)"
		},
		{
            name: "Buster",
            filePath: "/assets/mates/buster-the-underwear-model-smaller.jpg",
            caption: "Buster the underwear model"
		},
		{
            name: "Buster",
            filePath: "/assets/mates/buster-window-kiss-smaller.jpg",
            caption: "Buster going in for the window kiss"
		}
	];

	onComponentDidMount() {
        this.setState({
            busterPhotosTileLoadIndex: 0
        })
    }

    loadNextCarouselTile(carouselName, loadedIndex) {
        console.log(`${carouselName} ${loadedIndex} loaded`);
        
        if (carouselName === "buster-photos") {
            if (loadedIndex >= this.state.busterPhotosTileLoadIndex) {
                this.setState({
                    busterPhotosTileLoadIndex: loadedIndex + 1
                });
            }
        }
    }


	render() {
        var imageCarouselTileWidth = this.state.windowWidth < 980 ? this.state.windowWidth : 980;
		var busterPhotosCarouselTiles = this.busterPhotos.map((image, index) => (
			<FocusableImageCarouselTile
                name={image.name}
                imageFilePath={image.filePath}
                imageCaption={image.caption}
                imageClassName={image.name.toLowerCase().replace(/ /g, "-")}
                maxWidth={imageCarouselTileWidth}
                tileIndex={index}
                carouselName="buster-photos"
                canLoadImage={index <= this.state.busterPhotosTileLoadIndex}
				loadNext={this.loadNextCarouselTile.bind(this)}
				imageList={this.busterPhotos}
                carouselIndex={index}
            />
		));
		busterPhotosCarouselTiles.unshift((<SimpleTextCarouselTile header="Photos of Buster" paragraph="I have only one friend and his name is Buster. Here are some photos of him for you to peruse" />))

		return (
			<div className="viewport-pagination-view mates">
				<IndexIndicator hashes={this.hashes} activeIndex={this.state.currentIndex} setIndex={this.setIndex.bind(this)}></IndexIndicator>
				<div className="viewport-container" style={{ transform: "translateY(-" + this.state.currentIndex * this.state.windowHeight + "px)" }}>
					<div className="viewport" style={{ height: this.state.windowHeight + "px" }}>
						<div>
							<h1>My Mates<span className="highlight-full-stop">.</span></h1>
							<div className="scroll-down">
								<p>SCROLL DOWN</p>
								<FontAwesomeIcon icon={faChevronDown} />
							</div>
						</div>
					</div>

					<div className="viewport" style={{ height: this.state.windowHeight + "px" }}>
						<div>
							<Carousel carouselItems={busterPhotosCarouselTiles} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Mates;
