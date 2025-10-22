"use client";

import styles from "./SubCategoriesGrid.module.scss";
import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/shared/ctaButtons/ctaButtons";

export default function SubcategoriesGrid() {
	const cardLinks = [
		{
			slug: "Tank",
			name: "Tank",
			image: "/brandLogos/tank.png",
		},
		{
			slug: "JAC",
			name: "JAC",
			image: "/brandLogos/jac.png",
		},
		{
			slug: "Huanghai",
			name: "Huanghai",
			image: "/brandLogos/huanghai.png",
		},
		{
			slug: "Dongfeng",
			name: "Dongfeng",
			image: "/brandLogos/dongfeng.png",
		},
		{
			slug: "Foton",
			name: "Foton",
			image: "/brandLogos/foton.png",
		},
		{
			slug: "Changan",
			name: "Changan",
			image: "/brandLogos/changan.png",
		},
		{
			slug: "Baic",
			name: "Baic",
			image: "/brandLogos/baic.png",
		},
		{
			slug: "Great_Wall",
			name: "Great Wall",
			image: "/brandLogos/gwm.png",
		},
		{
			slug: "Sollers",
			name: "Sollers",
			image: "/brandLogos/sollers.png",
		},
		{
			slug: "JMC",
			name: "JMC",
			image: "/brandLogos/jmc.png",
		},
	];

	return (
		<>
			<div className={styles.grid}>
				{cardLinks.map((link, index) => (
					<Link href={`/catalog/category/${link.slug}`} key={index} className={styles.grid_card}>
						<div className={styles.grid_card_content}>
							<div className={styles.text_content}>
								<h3>{link.name}</h3>
							</div>
							<div className={styles.image_container}>
								<Image
									src={link.image}
									alt={`${link.name} logo`}
									width={120}
									height={80}
									className={styles.brand_image}
								/>
							</div>
						</div>
					</Link>
				))}

				{/* Карточка "Каталог" */}
				<div className={styles.grid_card}>
					<div className={styles.grid_card_content}>
						<div className={styles.catalog_content}>
							<h3>Больше товаров в каталоге</h3>
							<LinkButton text="Каталог" link="/catalog" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
