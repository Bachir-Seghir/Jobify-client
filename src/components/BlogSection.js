import React, { useEffect, useState } from "react";

const posts = [
  {
    title: "19 Hot Crypto Startups Hiring Remotely in 2022",
    id: 1,
    href: "#",
    category: { name: "Job Collection", href: "#" },
    description:
      "Either Crypto has a great PR team, or the internet-based medium of exchange is truly taking the world by storm. The latter seems to hold more validity, seeing that the cryptocurrency market is on track to reach 1TN in value by 2026. Over the past few years, crypto has gone from risky, rumored promise, to a strong bid for investors. What was once synonymous with merely BitCoin has now evolved into an entirely different currency ecosystem - expanding to thousands of individual internet currencies - each eager to capitalize on an expansive opportunity.",
    date: "Mar 16, 2022",
    datetime: "2022-03-16",
    imageUrl:
      "https://assets.website-files.com/61f0a5f38caa5c524914a1df/620202e3f2df9091f464d354_Frame%20295-min.jpeg",
    readingTime: "6 min",
    author: {
      name: "Roel Aufderehar",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "How to use search engine optimization to drive sales",
    id: 2,
    href: "#",
    category: { name: "Web Development", href: "#" },
    description:
      "SEO is a fundamental part of digital marketing because people conduct trillions of searches every year, often with commercial intent to find information about products and services. Search is often the primary source of digital traffic for brands and complements other marketing channels. Greater visibility and ranking higher in search results than your competition can have a material impact on your bottom line.",
    date: "Mar 10, 2022",
    datetime: "2022-03-10",
    imageUrl:
      "https://www.digitalmenta.com/wp-content/uploads/2019/09/tendencias-seo-2020.jpg",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    id: 3,
    href: "#",
    category: { name: "Case Study", href: "#" },
    description:
      "The happier you are with a brand, the longer you stay with them. So, if you treat your customers poorly or ignore their customer service emails, then they are more likely to stop doing business with you. This is why companies that deliver a superior customer experience outperform their competitors - and this means they'll be spending more with your business (and less in theirs!).",
    date: "Feb 12, 2022",
    datetime: "2022-02-12",
    imageUrl:
      "https://geeksaroundglobe.com/wp-content/uploads/2021/02/customer_experience_in_2019_5c406c6db280e.jpg",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    id: 4,
    href: "#",
    category: { name: "Case Study", href: "#" },
    description:
      "The happier you are with a brand, the longer you stay with them. So, if you treat your customers poorly or ignore their customer service emails, then they are more likely to stop doing business with you. This is why companies that deliver a superior customer experience outperform their competitors - and this means they'll be spending more with your business (and less in theirs!).",
    date: "Feb 12, 2022",
    datetime: "2022-02-12",
    imageUrl:
      "https://geeksaroundglobe.com/wp-content/uploads/2021/02/customer_experience_in_2019_5c406c6db280e.jpg",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    id: 5,
    href: "#",
    category: { name: "Case Study", href: "#" },
    description:
      "The happier you are with a brand, the longer you stay with them. So, if you treat your customers poorly or ignore their customer service emails, then they are more likely to stop doing business with you. This is why companies that deliver a superior customer experience outperform their competitors - and this means they'll be spending more with your business (and less in theirs!).",
    date: "Feb 12, 2022",
    datetime: "2022-02-12",
    imageUrl:
      "https://geeksaroundglobe.com/wp-content/uploads/2021/02/customer_experience_in_2019_5c406c6db280e.jpg",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "Improve your customer experience",
    id: 6,
    href: "#",
    category: { name: "Case Study", href: "#" },
    description:
      "The happier you are with a brand, the longer you stay with them. So, if you treat your customers poorly or ignore their customer service emails, then they are more likely to stop doing business with you. This is why companies that deliver a superior customer experience outperform their competitors - and this means they'll be spending more with your business (and less in theirs!).",
    date: "Feb 12, 2022",
    datetime: "2022-02-12",
    imageUrl:
      "https://geeksaroundglobe.com/wp-content/uploads/2021/02/customer_experience_in_2019_5c406c6db280e.jpg",
    readingTime: "11 min",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    title: "How to use search engine optimization to drive sales",
    id: 7,
    href: "#",
    category: { name: "Web Development", href: "#" },
    description:
      "SEO is a fundamental part of digital marketing because people conduct trillions of searches every year, often with commercial intent to find information about products and services. Search is often the primary source of digital traffic for brands and complements other marketing channels. Greater visibility and ranking higher in search results than your competition can have a material impact on your bottom line.",
    date: "Mar 10, 2022",
    datetime: "2022-03-10",
    imageUrl:
      "https://www.digitalmenta.com/wp-content/uploads/2019/09/tendencias-seo-2020.jpg",
    readingTime: "4 min",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function BlogSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {posts.slice(0, 3).map((post) => (
        <div
          key={post.id}
          className="flex flex-col rounded-sm shadow-lg overflow-hidden"
        >
          <div className="flex-shrink-0">
            <img
              className="h-60 w-full object-cover"
              src={post.imageUrl}
              alt=""
            />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-sky-600">
                <a href={post.category.href} className="hover:underline">
                  {post.category.name}
                </a>
              </p>
              <a href={post.href} className="block mt-2">
                <p className="text-xl font-semibold text-gray-900">
                  {post.title}
                </p>
                <p className="h-38 mt-3 text-base text-gray-500 overflow-hidden line-clamp-3">
                  {post.description}
                </p>
              </a>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <a href={post.author.href}>
                  <span className="sr-only">{post.author.name}</span>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={post.author.imageUrl}
                    alt=""
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  <a href={post.author.href} className="hover:underline">
                    {post.author.name}
                  </a>
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time dateTime={post.datetime}>{post.date}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readingTime} read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
