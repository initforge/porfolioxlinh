# Performance Optimizations

## Đã thực hiện

### 1. Lazy Loading Three.js
- Three.js components được lazy load để giảm initial bundle size
- Delay 500ms trước khi load Three.js để page render nhanh hơn
- Sử dụng React Suspense để handle loading state

### 2. Lazy Loading GSAP
- GSAP và ScrollTrigger được dynamic import
- Chỉ load khi cần thiết, không block initial render
- Giảm đáng kể initial bundle size

### 3. Next.js Optimizations
- `optimizePackageImports` cho các packages lớn
- Font optimization
- Compression enabled

### 4. Code Splitting
- Components được split tự động bởi Next.js
- Route-based code splitting

## Kết quả

### Trước optimization:
- First compilation: ~11.5s (1529 modules)
- First request: ~12.6s
- Subsequent requests: ~200ms

### Sau optimization:
- Three.js và GSAP được lazy load
- Initial bundle nhỏ hơn
- Page load nhanh hơn
- User experience tốt hơn

## Best Practices

1. **Lazy load heavy libraries** - Three.js, GSAP
2. **Delay non-critical features** - Load sau khi page đã render
3. **Use Suspense** - Better loading states
4. **Optimize images** - Next.js Image component
5. **Code splitting** - Route-based splitting

## Monitoring

Để kiểm tra performance:

```bash
# Build và analyze bundle
npm run build
npm run analyze  # nếu có @next/bundle-analyzer
```

## Production

Trên production (Vercel):
- Automatic code splitting
- Edge caching
- CDN delivery
- Optimized builds

Performance sẽ tốt hơn nhiều so với development mode!

