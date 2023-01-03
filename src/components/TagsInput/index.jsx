import React, { useState } from "react";
import "./index.css"

const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = (event, indexToRemove) => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
		props.selectedTags([...tags, event.target.value]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<text className='tag-title'>{tag}</text>
						<text className='tag-close-icon'
							onClick={(event) => {
								removeTags(event, index)
							}}
						>
							x
						</text>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key === "," ? addTags(event) : null}
				placeholder= {props.text_placeholder}
			/>
		</div>
	);
};

const TagsInputTest = () => {
	const selectedTags = tags => {
		console.log(tags);
	};
	return (
		<div className="form-control">
			<TagsInput selectedTags={selectedTags}  tags={['Sample Award', 'Khel']}/>
		</div>
	);
};

export default TagsInput;
