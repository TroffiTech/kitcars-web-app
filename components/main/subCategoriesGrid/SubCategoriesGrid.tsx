"use client";

import styles from "./SubCategoriesGrid.module.scss";
import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/shared/ctaButtons/ctaButtons";

export default function SubcategoriesGrid() {
	const cardLinks = [
		{
			slug: "tank",
			name: "Tank",
			image: "/brandLogos/tank.png",
		},
		{
			slug: "jac",
			name: "JAC",
			image: "/brandLogos/jac.png",
		},
		{
			slug: "huanghai",
			name: "Huanghai",
			image: "/brandLogos/huanghai.png",
		},
		{
			slug: "dongfeng",
			name: "Dongfeng",
			image: "/brandLogos/dongfeng.png",
		},
		{
			slug: "fonot",
			name: "Foton",
			image: "/brandLogos/foton.png",
		},
		{
			slug: "changan",
			name: "Changan",
			image: "/brandLogos/changan.png",
		},
		{
			slug: "baic",
			name: "Baic",
			image: "/brandLogos/baic.png",
		},
		{
			slug: "great_wall",
			name: "Great Wall",
			image: "/brandLogos/gwm.png",
		},
		{
			slug: "sollers",
			name: "Sollers",
			image: "/brandLogos/sollers.png",
		},
		{
			slug: "jmc",
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
