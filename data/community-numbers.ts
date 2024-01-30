export type CommunityNumber = {
    title: string;
    number: string;
    icon?: string
  };
  
  const communityNumbers: CommunityNumber[] = [
    {
      title: "GitHub",
      number: "12900",
      icon: "img/star.svg"
    },
    {
        title: "Contributors",
        number: "600+",
    },
    {
        title: "Slack members",
        number: "9000+",
    },
  ];
  
  export default communityNumbers;
  