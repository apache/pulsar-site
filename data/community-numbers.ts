export type CommunityNumber = {
    title: string;
    number: string;
    isLink?: boolean;
    icon?: string;
    link?: string;
    linkTitle?: string;
  };
  
  const communityNumbers: CommunityNumber[] = [
    {
      title: "GitHub",
      number: "14200",
      icon: "img/star.svg",
      isLink: true,
      linkTitle: 'View',
      link: 'https://github.com/apache/pulsar'
    },
    {
        title: "Contributors",
        number: "650",
        linkTitle: 'View',
        link: 'https://github.com/apache/pulsar/graphs/contributors'
    },
    {
        title: "Slack members",
        number: "10450",
        linkTitle: 'Join',
        link: 'https://communityinviter.com/apps/apache-pulsar/apache-pulsar'
    },
  ];
  
  export default communityNumbers;
  