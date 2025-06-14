const API_BASE_URL =
  "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

// Fungsi pembungkus (wrapper) untuk fetch agar lebih rapi
async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        apiKey: API_KEY,
        "Content-Type": "application/json",
        ...options.headers,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const getBanners = () => fetchApi("/banners");
export const getBannerDetails = (id) => fetchApi(`/banner/${id}`); // Baru
export const getCategories = () => fetchApi("/categories");
export const getCategoryDetails = (id) => fetchApi(`/category/${id}`); // Baru
export const getActivitiesByCategoryId = (id) =>
  fetchApi(`/activities-by-category/${id}`); // Baru
export const getPromos = () => fetchApi("/promos");
export const getPromoDetails = (id) => fetchApi(`/promo/${id}`); // Baru
export const getAllActivities = () => fetchApi("/activities");
export const getActivityDetails = (id) => fetchApi(`/activity/${id}`);
