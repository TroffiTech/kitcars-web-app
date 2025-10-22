import { arrowDownMiniSVG } from "@/components/shared/icons/icons";
import styles from "./filters.module.scss";
import { Category } from "@/types/productsType";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

async function fetcher(url: string) {
	const res = await fetch(url);
	return await res.json();
}

export default function Filters() {
	const { data, isLoading } = useSWR("/api/store/categories/getCategoriesFile", fetcher);

	if (isLoading) {
		return (
			<ul className={`${styles.filters} ${styles.loading}`}>
				{[1, 2, 3, 4, 5].map((i) => (
					<li className={styles.parentCategory} key={i}>
						<div className={styles.title}>
							<span className={styles.link}>Загрузка...</span>
							<div className={styles.arrow}>{arrowDownMiniSVG}</div>
						</div>
					</li>
				))}
			</ul>
		);
	}

	return (
		<ul className={styles.filters}>
			{Array.isArray(data) &&
				data.map((parentCategory: Category) => (
					<li className={styles.parentCategory} key={parentCategory.id}>
						<ChildrenCategory parentCategory={parentCategory} />
					</li>
				))}
		</ul>
	);
}

function ChildrenCategory({ parentCategory }: { parentCategory: Category }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const hasChildren = parentCategory.children && parentCategory.children.length > 0;

	return (
		<>
			<div onClick={() => hasChildren && setIsExpanded((prev) => !prev)} className={styles.title}>
				<Link className={styles.link} href={`/catalog/category/${parentCategory.slug}`}>
					{parentCategory.name}
					{parentCategory.count > 0 && (
						<span
							style={{
								marginLeft: "auto",
								fontSize: "0.8rem",
								opacity: 0.7,
								paddingLeft: "0.5rem",
							}}
						>
							({parentCategory.count})
						</span>
					)}
				</Link>
				{hasChildren && (
					<div
						className={styles.arrow}
						style={{
							transform: `${isExpanded ? "rotate(180deg)" : "rotate(0deg)"}`,
						}}
					>
						{arrowDownMiniSVG}
					</div>
				)}
			</div>

			{hasChildren && (
				<ul
					className={`${styles.children} ${isExpanded ? styles.expanded : ""}`}
					style={{
						maxHeight: isExpanded ? `${parentCategory.children.length * 50}px` : "0px",
					}}
				>
					{parentCategory.children.map((child: Category) => (
						<li key={child.id}>
							<Link className={styles.link} href={`/catalog/category/${child.slug}`}>
								{child.name}
								{child.count > 0 && (
									<span
										style={{
											marginLeft: "auto",
											fontSize: "0.75rem",
											opacity: 0.6,
										}}
									>
										({child.count})
									</span>
								)}
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
