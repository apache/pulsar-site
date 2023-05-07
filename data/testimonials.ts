export type Testimonial = {
  company: string;
  author: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    company: 'Bigo',
    author: 'Hang Chen',
    text: 'Apache Pulsar provides native support for serverless functions where data is processed as soon as it arrives in a streaming fashion and gives flexible deployment options (thread, process, container). We need only focus on computation logic rather than dealing with complicated configuration or management, which helps us build a streaming platform faster and conveniently.',
  },
  {
    company: 'Ksyun',
    author: 'Bin Liu',
    text: 'Pulsar, we can scale up partitions and merge partitions easily, and process millions of topics',
  },
  {
    company: 'Company name',
    author: 'Steve Anderson',
    text: 'Pulsar, we can scale up partitions and merge partitions easily, and process millions of topics',
  },
  {
    company: 'Company name',
    author: 'Steve Anderson',
    text: 'Pulsar, we can scale up partitions and merge partitions easily, and process millions of topics',
  },
  {
    company: 'Company name',
    author: 'Steve Anderson',
    text: 'Pulsar, we can scale up partitions and merge partitions easily, and process millions of topics',
  },
  {
    company: 'Company name',
    author: 'Steve Anderson',
    text: 'Pulsar, we can scale up partitions and merge partitions easily, and process millions of topics',
  },
  {
    company: 'Company name',
    author: 'Steve Anderson',
    text: 'Pulsar, we can scale up partitions and merge partitions easily, and process millions of topics',
  }
];

export default testimonials;
