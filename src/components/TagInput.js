import React, { useState } from "react";

const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
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
						<h6 className='tag-title'>{tag}</h6>
						<h6 className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</h6>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key === "," ? addTags(event) : null}
				placeholder="Press enter to add tags"
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
			<TagsInput selectedTags={selectedTags}  tags={['Nodejs', 'MongoDB']}/>
		</div>
	);
};

export default TagsInput;
