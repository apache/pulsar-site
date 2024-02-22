export type CommunityNumber = {
    title: string;
    number: string;
    icon?: string;
    link?: string;
    linkTitle?: string;
  };
  
  const communityNumbers: CommunityNumber[] = [
    {
      title: "GitHub",
      number: "13600",
      icon: "img/star.svg",
      linkTitle: 'View',
      link: 'https://github.com/apache/pulsar'
    },
    {
        title: "Contributors",
        number: "600+",
        linkTitle: 'View',
        link: 'https://github.com/apache/pulsar/graphs/contributors'
    },
    {
        title: "Slack members",
        number: "10000+",
        linkTitle: 'Join',
        link: 'https://apache-pulsar.slack.com'
    },
  ];
  
  export default communityNumbers;
  