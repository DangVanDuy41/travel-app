export type LocationType =
    | "TOURIST_ATTRACTION"
    | "RESTAURANT"
    | "SHOPPING"
    | "PARK"
    | "CULTURAL_SITE"
    | "ACCOMMODATION"
    | "ENTERTAINMENT"
    | "TRANSPORT_HUB"
    | "EVENT"
    | "ADVENTURE"
    | "HEALTH_WELLNESS"
    | "EDUCATIONAL"
    | "FUNCTIONAL"
    | "ADMINISTRATIVE";


export const locationTypeTranslations: Record<LocationType, string> = {
    TOURIST_ATTRACTION: "Địa điểm du lịch",
    RESTAURANT: "Nhà hàng",
    SHOPPING: "Mua sắm",
    PARK: "Công viên",
    CULTURAL_SITE: "Di tích văn hóa",
    ACCOMMODATION: "Nơi lưu trú",
    ENTERTAINMENT: "Giải trí",
    TRANSPORT_HUB: "Trung tâm giao thông",
    EVENT: "Sự kiện",
    ADVENTURE: "Phiêu lưu",
    HEALTH_WELLNESS: "Sức khỏe & Thể hình",
    EDUCATIONAL: "Giáo dục",
    FUNCTIONAL: "Chức năng",
    ADMINISTRATIVE: "Hành chính",
};