"use client";

import { arrowDownMiniSVG } from "@/components/shared/icons/icons";
import styles from "./filters.module.scss";
import { Category } from "@/types/productsType";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";

async function fetcher(url: string) {
	const res = await fetch(url);
	return await res.json();
}

export default function Filters() {
	const { data, isLoading } = useSWR("/api/store/categories/getCategoriesFile", fetcher);
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const categoryParam = searchParams?.get("id");
		if (categoryParam) {
			const categoryIds = categoryParam
				.split(",")
				.map((id) => parseInt(id.trim()))
				.filter((id) => !isNaN(id));

			if (categoryIds.length > 0) {
				setSelectedCategories(categoryIds);
			}
		}
	}, [searchParams]);

	const handleCategoryToggle = (categoryId: number) => {
		setSelectedCategories((prev) => {
			const newSelection =
				prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId];
			return newSelection;
		});
	};

	const handleClearFilters = () => {
		setSelectedCategories([]);
		router.push("/catalog/");
	};

	const handleApplyFilters = () => {
		const categoriesParam = selectedCategories.join(",");
		if (categoriesParam === "") router.push("/catalog/");
		else router.push(`/catalog/category?id=${categoriesParam}`);
	};

	if (isLoading) {
		return (
			<div className={styles.filters}>
				<div className={styles.header}>
					<h3>Категории</h3>
				</div>
				<ul className={styles.categoriesList}>
					{[1, 2, 3, 4, 5].map((i) => (
						<li className={styles.categoryItem} key={i}>
							<div className={styles.title}>
								<div className={styles.categoryInfo}>
									<span className={styles.categoryName}>Загрузка...</span>
								</div>
							</div>
						</li>
					))}
				</ul>
				<button className={styles.submitBtn} onClick={handleApplyFilters}>
					Применить фильтры
				</button>
			</div>
		);
	}

	if (!data || !Array.isArray(data)) {
		return (
			<div className={styles.filters}>
				<div className={styles.header}>
					<h3>Категории</h3>
				</div>
				<div className={styles.error}>Не удалось загрузить категории</div>
			</div>
		);
	}

	return (
		<div className={styles.filters}>
			<div className={styles.header}>
				<h3>Категории</h3>
				<button
					className={styles.clearBtn}
					onClick={handleClearFilters}
					disabled={selectedCategories.length === 0}
				>
					Сбросить
				</button>
			</div>

			<ul className={styles.categoriesList}>
				{data.map((category: Category) => (
					<CategoryItem
						key={category.id}
						category={category}
						level={0}
						selectedCategories={selectedCategories}
						onCategoryToggle={handleCategoryToggle}
					/>
				))}
			</ul>

			<button className={styles.submitBtn} onClick={handleApplyFilters}>
				Применить фильтры
				{selectedCategories.length > 0 && ` (${selectedCategories.length})`}
			</button>
		</div>
	);
}

function CategoryItem({
	category,
	level,
	selectedCategories,
	onCategoryToggle,
}: {
	category: Category;
	level: number;
	selectedCategories: number[];
	onCategoryToggle: (id: number) => void;
}) {
	const [isExpanded, setIsExpanded] = useState(level < 0);
	const hasChildren = category.children && category.children.length > 0;
	const isSelected = selectedCategories.includes(category.id);

	const handleTitleClick = () => {
		if (hasChildren) {
			setIsExpanded(!isExpanded);
		}
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		onCategoryToggle(category.id);
	};

	const handleArrowClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsExpanded(!isExpanded);
	};

	return (
		<li className={`${styles.categoryItem} ${isSelected ? styles.selected : ""}`}>
			<div
				className={styles.title}
				style={{ paddingLeft: `${level * 2 + 8}px` }}
				onClick={handleTitleClick}
			>
				<div className={styles.categoryInfo}>
					<input
						type="checkbox"
						className={styles.checkbox}
						id={`category-${category.id}`}
						checked={isSelected}
						onChange={handleCheckboxChange}
						onClick={(e) => e.stopPropagation()}
					/>

					<label
						htmlFor={`category-${category.id}`}
						className={styles.categoryName}
						onClick={(e) => e.stopPropagation()}
					>
						{category.name}
					</label>
				</div>

				{hasChildren && (
					<button
						className={`${styles.arrow} ${isExpanded ? styles.expanded : ""}`}
						onClick={handleArrowClick}
						type="button"
						aria-label={isExpanded ? "Свернуть" : "Развернуть"}
					>
						{arrowDownMiniSVG}
					</button>
				)}
			</div>

			{hasChildren && (
				<div className={`${styles.childrenContainer} ${isExpanded ? styles.expanded : ""}`}>
					<ul className={styles.children}>
						{category.children.map((child) => (
							<CategoryItem
								key={child.id}
								category={child}
								level={level + 1}
								selectedCategories={selectedCategories}
								onCategoryToggle={onCategoryToggle}
							/>
						))}
					</ul>
				</div>
			)}
		</li>
	);
}
