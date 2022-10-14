import React from "react";

const SubHeroBlock = (props) => {
  return(
      <section className={`container subhero content-block ${props.className}`}>
        <div className="inner inner--narrow text--center">
            <h2>{props.heading}</h2>
            <p>{props.content} </p>
        </div>
      </section>
  )
}

export default SubHeroBlock;
