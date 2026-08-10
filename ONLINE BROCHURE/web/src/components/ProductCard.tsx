import type { Product } from '../types';
import './ProductCard.css';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} loading="lazy" className="product-image" />
        ) : (
          <div className="product-image-placeholder">No image</div>
        )}
      </div>
      <div className="product-body">
        <div className="product-code">{product.code}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-meta">
          {product.material && <span>{product.material}</span>}
          {product.unit && <span>{product.unit}</span>}
        </div>
        <div className="product-qty">
          {product.qtyPerCarton && <span>Ctn: {product.qtyPerCarton}</span>}
          {product.qtyPerBox && <span>Box: {product.qtyPerBox}</span>}
        </div>
        {product.otherInfo && <div className="product-other">{product.otherInfo}</div>}
      </div>
    </div>
  );
}
