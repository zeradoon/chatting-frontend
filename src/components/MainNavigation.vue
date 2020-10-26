<template>
	<div class="main-navigation">
		<div
			class="container"
			style="background-color: snow;padding: 1rem;border-bottom: 1px solid rgba(0, 0, 0, 0.1);"
		>
			<nav
				class="navbar navbar-expand-lg navbar-light justify-content-between"
				style="padding: 0rem;border-bottom: 0rem;margin-bottom:0rem"
			>
				<a class="navbar-brand" href="index.html" style="flex: 1;">
					<img src="@/assets/img/logo.png" alt="" style="width: 200%;" />
				</a>
				<h1
					style="flex: 10;font-size: 1.7rem;margin-bottom: 0rem;align-self: center;text-align: center"
				>
					{{ text }}
				</h1>
				<button
					class="navbar-toggler collapsed"
					type="button"
					data-toggle="collapse"
					data-target="#navbar"
					aria-controls="navbar"
					aria-expanded="false"
					aria-label="Toggle navigation"
					style="flex: 0;"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="navbar-collapse collapse" id="navbar" style="">
					<!--Main navigation list-->
					<ul class="navbar-nav">
						<li class="nav-item active has-child">
							<a class="nav-link" href="#">Home</a>
							<ul class="child">
								<li class="nav-item">
									<a href="index.html" class="nav-link">Home 1</a>
								</li>
								<li class="nav-item">
									<a href="index-2.html" class="nav-link">Home 2</a>
								</li>
								<li class="nav-item">
									<a href="index-3.html" class="nav-link">Home 3</a>
								</li>
								<li class="nav-item">
									<a href="index-4.html" class="nav-link">Home 4</a>
								</li>
							</ul>
						</li>
						<li class="nav-item has-child">
							<a class="nav-link" href="#">Listing</a>
							<!-- 1st level -->
							<ul class="child">
								<li class="nav-item has-child">
									<a href="#" class="nav-link">Grid</a>
									<!-- 2nd level -->
									<ul class="child">
										<li class="nav-item">
											<a href="listing-grid-full-width.html" class="nav-link"
												>Full Width</a
											>
										</li>
										<li class="nav-item">
											<a href="listing-grid-sidebar.html" class="nav-link"
												>With Sidebar</a
											>
										</li>
										<li class="nav-item">
											<a
												href="listing-grid-compact-sidebar.html"
												class="nav-link"
												>Compact With Sidebar</a
											>
										</li>
										<li class="nav-item">
											<a
												href="listing-grid-compact-full-width.html"
												class="nav-link"
												>Compact Full Width</a
											>
										</li>
									</ul>
									<!-- end 2nd level -->
								</li>
								<li class="nav-item has-child">
									<a href="#" class="nav-link">List</a>
									<!-- 2nd level -->
									<ul class="child">
										<li class="nav-item">
											<a href="listing-list-full-width.html" class="nav-link"
												>Full Width</a
											>
										</li>
										<li class="nav-item">
											<a href="listing-list-sidebar.html" class="nav-link"
												>With Sidebar</a
											>
										</li>
										<li class="nav-item">
											<a
												href="listing-list-compact-sidebar.html"
												class="nav-link"
												>Compact With Sidebar</a
											>
										</li>
										<li class="nav-item">
											<a
												href="listing-list-compact-full-width.html"
												class="nav-link"
												>Compact Full Width</a
											>
										</li>
									</ul>
									<!-- end 2nd level -->
								</li>
								<li class="nav-item has-child">
									<a href="#" class="nav-link">Masonry</a>
									<!-- 2nd level -->
									<ul class="child">
										<li class="nav-item">
											<a href="listing-masonry-full-width.html" class="nav-link"
												>Full Width</a
											>
										</li>
										<li class="nav-item">
											<a href="listing-masonry-sidebar.html" class="nav-link"
												>With Sidebar</a
											>
										</li>
									</ul>
									<!-- end 2nd level -->
								</li>
								<li class="nav-item has-child">
									<a href="#" class="nav-link">Single</a>
									<!-- 2nd level -->
									<ul class="child">
										<li class="nav-item">
											<a href="single-listing-1.html" class="nav-link"
												>Single 1</a
											>
										</li>
										<li class="nav-item">
											<a href="single-listing-2.html" class="nav-link"
												>Single 2</a
											>
										</li>
										<li class="nav-item">
											<a href="single-listing-3.html" class="nav-link"
												>Single 3</a
											>
										</li>
									</ul>
									<!-- end 2nd level -->
								</li>
							</ul>
							<!-- end 1st level -->
						</li>
						<li class="nav-item has-child">
							<a class="nav-link" href="#">Pages</a>
							<!-- 2nd level -->
							<ul class="child">
								<li class="nav-item">
									<a href="sellers.html" class="nav-link">Sellers</a>
								</li>
								<li class="nav-item has-child">
									<a href="#" class="nav-link">Seller Detail</a>
									<!-- 3rd level -->
									<ul class="child">
										<li class="nav-item">
											<a href="seller-detail-1.html" class="nav-link"
												>Seller Detail 1</a
											>
										</li>
										<li class="nav-item">
											<a href="seller-detail-2.html" class="nav-link"
												>Seller Detail 2</a
											>
										</li>
									</ul>
									<!-- end 3rd level -->
								</li>
								<li class="nav-item">
									<a href="blog.html" class="nav-link">Blog</a>
								</li>
								<li class="nav-item">
									<a href="blog-post.html" class="nav-link">Blog Post</a>
								</li>
								<li class="nav-item">
									<a href="submit.html" class="nav-link">Submit Ad</a>
								</li>
								<li class="nav-item">
									<a href="pricing.html" class="nav-link">Pricing</a>
								</li>
								<li class="nav-item">
									<a href="faq.html" class="nav-link">FAQ</a>
								</li>
							</ul>
							<!-- end 2nd level -->
						</li>
						<li class="nav-item has-child">
							<a class="nav-link" href="#">Extras</a>
							<!--1st level -->
							<ul class="child">
								<li class="nav-item has-child">
									<a href="#" class="nav-link">Grid Variants</a>
									<ul class="child">
										<li class="nav-item">
											<a href="listing-grid-4-items.html" class="nav-link"
												>4 Items</a
											>
										</li>
										<li class="nav-item">
											<a href="listing-grid-3-items.html" class="nav-link"
												>3 Items</a
											>
										</li>
										<li class="nav-item">
											<a href="listing-grid-2-items.html" class="nav-link"
												>2 Items</a
											>
										</li>
									</ul>
								</li>
								<li class="nav-item has-child">
									<a href="#" class="nav-link">User Panel</a>
									<ul class="child">
										<li class="nav-item">
											<a href="my-profile.html" class="nav-link">My Profile</a>
										</li>
										<li class="nav-item">
											<a href="my-ads.html" class="nav-link">My Ads</a>
										</li>
										<li class="nav-item">
											<a href="change-password.html" class="nav-link"
												>Change Password</a
											>
										</li>
										<li class="nav-item">
											<a href="sign-in.html" class="nav-link">Sign In</a>
										</li>
										<li class="nav-item">
											<a href="register.html" class="nav-link">Register</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="elements.html" class="nav-link">Elements</a>
								</li>
								<li class="nav-item">
									<a href="typography.html" class="nav-link">Typography</a>
								</li>
								<li class="nav-item has-child">
									<a href="#" class="nav-link">Nested Navigation</a>
									<!--2nd level -->
									<ul class="child">
										<li class="nav-item">
											<a href="#" class="nav-link">Level 2</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link">Level 2</a>
										</li>
										<li class="nav-item has-child">
											<a href="#" class="nav-link">Level 2</a>
											<!--3rd level -->
											<ul class="child">
												<li class="nav-item has-child">
													<a href="#" class="nav-link">Level 3</a>
													<!--4th level -->
													<ul class="child">
														<li class="nav-item">
															<a href="#" class="nav-link">Level 4</a>
														</li>
														<li class="nav-item">
															<a href="#" class="nav-link">Level 4</a>
														</li>
														<li class="nav-item">
															<a href="#" class="nav-link">Level 4</a>
														</li>
													</ul>
													<!-- end 4th level-->
												</li>
												<li class="nav-item">
													<a href="#" class="nav-link">Level 3</a>
												</li>
												<li class="nav-item">
													<a href="#" class="nav-link">Level 3</a>
												</li>
											</ul>
											<!--end 3rd level-->
										</li>
									</ul>
									<!-- end 2nd level -->
								</li>
								<li class="nav-item">
									<a href="image-header.html" class="nav-link">Image Header</a>
								</li>
								<li class="nav-item">
									<a href="messaging.html" class="nav-link">Messages</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="contact.html">Contact</a>
						</li>
						<li class="nav-item">
							<a
								href="submit.html"
								class="btn btn-primary text-caps btn-rounded btn-framed"
								>Submit Ad</a
							>
						</li>
					</ul>
					<!--Main navigation list-->
				</div>
				<!--end navbar-collapse-->
			</nav>
			<!--end navbar-->

			<!--end breadcrumb-->
		</div>
		<!--end container-->
	</div>
</template>

<script>
export default {
	name: 'MainNavigation',
	props: {
		text: {
			type: String,
		},
	},
};
</script>

<style></style>
