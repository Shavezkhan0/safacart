'use client';
import SkeletonCard from "@/components/SkeletonCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { useRouter } from "next/navigation";
import LoadingBar from "react-top-loading-bar";

export default function Mobile_Phones() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    const fetchProducts = async () => {
        if (!hasMore) return;
        setLoadingMore(true);
        try {
            const response = await fetch(`/api/products/getProducts_Category?category=Mobile&skip=${products.length}&limit=10`);
            const data = await response.json();
            if (!data.products || data.products.length === 0) {
                setHasMore(false);
            } else {
                setProducts((prev) => [...prev, ...data.products]);
            }
        } catch (error) {
            console.error("Error fetching laptop products:", error);
        } finally {
            setLoadingMore(false);
            setLoading(false);
            setProgress(100);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400;
            if (bottom && !loading && hasMore) {
                fetchProducts();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore, products.length]);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <LoadingBar
                color="#f11946"
                progress={progress}
                waitingTime={3000}
                onLoaderFinished={() => setProgress(0)}
            />
            <main>
                <section className="text-center py-20">
                    <h1 className="text-4xl pt-5 text-green-900 font-bold mb-4">Eco-Friendly Mobile</h1>

                    {loading ? (
                        <div className="flex justify-center items-center flex-wrap gap-6">
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    ) : products.length > 0 ? (
                        <div className="flex justify-center items-center flex-wrap gap-6">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    onClick={() => {
                                        setProgress(100);
                                        router.push(`/product/${product._id}`);
                                    }}
                                    className="bg-white cursor-pointer shadow-green-300/50 shadow-lg rounded-lg p-4 w-64"
                                >
                                    <div className="relative w-full aspect-[5/6] bg-white rounded-lg overflow-hidden">
                                        <Image
                                            src={product.imageUrl}
                                            alt="Product img"
                                            fill
                                            className="object-cover mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex mt-4 justify-between items-center">
                                        <div className="flex flex-col items-start">
                                            <h2 className="text-xl font-semibold mt-2 line-clamp-1">
                                                {product.name}
                                            </h2>
                                            <p className="text-gray-600 flex justify-center items-center">
                                                <span>
                                                    <MdCurrencyRupee size={16} />
                                                </span>
                                                {product.price}
                                            </p>
                                        </div>
                                        <Image
                                            src={product.recycled === "True" ? "/images/recycled.png" : "/images/upcycling.png"}
                                            alt="Recycled Product"
                                            width={40}
                                            height={40}
                                            className="bg-white mix-blend-multiply"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-600">Please check back later.</p>
                        </div>
                    )}

                    {loadingMore && (
                        <div className="flex mt-4 justify-center items-center flex-wrap gap-6">
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    )}
                    {!hasMore && (
                        <p className="text-center mt-6 w-full col-span-full py-4 text-xl font-semibold text-gray-800 bg-green-100 rounded-xl shadow-lg mx-auto max-w-xs">
                            No more Mobile_Phones available
                        </p>
                    )}
                </section>
            </main>
        </>
    );
}
