import React from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/books';
import Page from "@site/src/components/ui/Page/Page";
import s from './BooksPage.module.css';

type CategoryFilterOption = data.Category | 'any';
const categoryFilterOptions = ['any', ...data.categories] as const;

const CaseStudiesPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilterOption>('any');
  const updateCategoryLinks = (newoption) => {
    setCategoryFilter(newoption);
    let allfilterlinks = document.querySelectorAll('.'+s.CategoryFilterLink);
    allfilterlinks.forEach((el) => {
      if(el.dataset.option == newoption) el.classList.add(s.active);
      else el.classList.remove(s.active);
    })
  }
  return (
    <Layout
      title={`Books`}
      description="Learn about the basics of using Apache Pulsar"
    >
      <Page>
        <section className={s.Header}> 
          <h1>Books</h1>
          <p>The next collection of books offers a guided learning experience into Apache Pulsar and related subjects.</p>
        </section>

        <div className={s.FiltersMobile}>
          <div>
          {categoryFilterOptions.map((option) => (
            <button type="button" data-option={option} onClick={() => updateCategoryLinks(option)} className={s.CategoryFilterLink+(option === 'any' ? ' '+s.active : '')}>{option === 'any' ? 'All' : data.categoryLabels[option]}</button>
          ))}
          </div>
        </div>

        <div className={s.Categories}>
          {categoryFilter === 'any' && <Cards resources={Object.values(data.resources).flat()} />}
          {data.categories.map((category) => {
            if (categoryFilter === category) {
              return <Cards key={category} resources={data.resources[category]} />
            }
          })}
        </div>

      </Page>
    </Layout>
  );
}

export default CaseStudiesPage;
