import { Link, useParams } from 'react-router-dom';
import { getGroupBySlug } from '../lib/productGroups';
import { categorySeo } from '../lib/seo';
import { usePageMeta } from '../lib/usePageMeta';
import './CategoryPage.css';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const group = getGroupBySlug(slug);
  const seo = categorySeo(group ? group.label : 'Products');
  usePageMeta(seo.title, seo.description);

  if (!group) {
    return (
      <div className="category-page">
        <section className="category-hero">
          <div className="container">
            <span className="eyebrow">Not Found</span>
            <h1>Category Not Found</h1>
            <p>We couldn't find that category. Browse our full range or request the catalogue directly.</p>
            <div className="category-actions">
              <Link to="/" className="btn btn-secondary">
                Back To Home
              </Link>
              <Link to="/catalogue" className="btn btn-primary">
                Request Catalogue
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="category-page">
      <section className="category-hero">
        <div className="container category-hero-inner">
          <div className="category-photo">
            <img src={`/groups/${group.image}`} alt={group.label} />
          </div>
          <div className="category-copy">
            <span className="eyebrow">Product Category</span>
            <h1>{group.label}</h1>
            <p>
              Wholesale {group.label} — sold in bulk carton and box quantities. Request pricing and
              available sizes.
            </p>
            <div className="category-actions">
              <Link to="/catalogue" className="btn btn-primary">
                Request Catalogue
              </Link>
              <Link to="/" className="btn btn-secondary">
                Browse All Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
