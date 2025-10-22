import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import Header from "@/components/shared/header/Header";
import { CategoryFeed } from "@/components/catalog/feeds/productsFeeds";
import SideSlideWidget from "@/components/shared/sideSlideWidget/sideSlideWidget";
import Footer from "@/components/shared/footer/Footer";

export default async function Category(props: { params: Promise<{ "category-slug": string }> }) {
	const searchedCategorySlug = (await props.params)["category-slug"];
	return (
		<main>
			<section className="flex-box__column">
				<Header />
				<ReduxStoreProvider>
					<SmallPopupProvider>
						<ModalDescriptionProvider>
							<CategoryFeed categorySlug={searchedCategorySlug} />
						</ModalDescriptionProvider>
					</SmallPopupProvider>
					<SideSlideWidget />
				</ReduxStoreProvider>
				<Footer />
			</section>
		</main>
	);
}
