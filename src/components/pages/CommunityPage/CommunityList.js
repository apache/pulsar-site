import React from "react";
export default function CommunityList(props) {
  const teamList = props.list;
  function TeamMember({ name, apacheId, roles }) {
    return (
        <div>
            <p>
                { name } <span className="slanted-separator">//</span> <strong> {apacheId} </strong> <span className="slanted-separator">//</span> <em>{roles}</em>
            </p>
        </div>
    );
  }
  return (
    <section>
      <div>
        {teamList.map((props, idx) => (
          <TeamMember key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
