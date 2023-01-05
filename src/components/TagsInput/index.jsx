import React, { useState, useEffect } from "react";
import "./index.css"

const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	
	useEffect(() => {
	console.log("tags", tags);
	}, [tags]);
	
	const removeTags = (event, indexToRemove) => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "" || event.target.value !== "," || event.target.value !== null || event.target.value !== "null" || event.target.value !== " " || event.target.value !== undefined) {
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


export default TagsInput;
