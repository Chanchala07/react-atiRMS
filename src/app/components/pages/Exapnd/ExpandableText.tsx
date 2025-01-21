import React, { useState } from 'react'

interface ExpandableTextProps{
    content:string
    maxLength?:number
}
const ExpandableText:React.FC<ExpandableTextProps> = ({content, maxLength = 30}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand =(event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsExpanded(!isExpanded);
    };
    const isExpandable = content && content.length > maxLength;
  return (
  
       <div>
      {isExpandable ? (
        <>
          {isExpanded ? content : `${content.substring(0, maxLength)}...`}
          <button
            onClick={toggleExpand}
            style={{
              background: 'none',
              border: 'none',
              color: '#6357ae',
              cursor: 'pointer',
              padding: 0,
              textDecorationLine: 'underline',
              marginLeft: 5,
            }}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </>
      ) : (
        content // If the content is not expandable, show it in full
      )}
    </div>
  );
};

export default ExpandableText
