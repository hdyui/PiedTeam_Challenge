import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/features/auth/services";

export const useUser = () => {
  return useQuery({
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 📌 QUERY KEY (BẮT BUỘC)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    queryKey: ["me"],

    // là key của cache, cùng key cùng cache

    /**
     * 🧠 Query Key Concept:
     *
     * - Key = ID của Cache
     * - Cùng Key = Chung Cache
     * - Khác Key = Khác Cache
     *
     * Ví dụ:
     * ['me'] ≠ ['user'] ≠ ['user', 1] ≠ ['user', 2]
     *
     * Key là Array vì:
     * - Dễ nest: ['user', userId, 'posts', postId]
     * - Dễ invalidate theo pattern - lấy điểm chung "user" thì thay đổi được toàn bộ key có thuộc tính "user" phía sau
     * -> nói cách khác ['user', 1] ≠ ['user', 2] là con của ['user']
     * - React Query so sánh array theo giá trị (deep equal)
     */

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🔧 QUERY FUNCTION (BẮT BUỘC)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    queryFn: authApi.getMe,

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ⚙️ QUERY OPTIONS (TÙY CHỌN)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // staleTime: 1000 * 60 * 5, // 5 phút
    /**
     * 💡 StaleTime Usage:
     *
     * 0 (default): Data ngay lập tức "cũ"
     * → Mỗi lần mount component = fetch lại
     * → Tốt cho: Real-time data (chat, stock price)
     *
     * 30s - 5 phút: Data "tươi" trong khoảng này
     * → Mount component = không fetch (dùng cache)
     * → Tốt cho: User profile, settings
     *
     * Infinity: Data KHÔNG BAO GIỜ cũ
     * → Chỉ fetch 1 lần duy nhất
     * → Tốt cho: Static data (country list, categories)
     */

    // enabled: !!accessToken,
    /**
     * 💡 Enabled Option:
     *
     * Conditional fetching:
     * enabled: false → Query không chạy
     * enabled: true → Query chạy
     *
     * Use case:
     * - Chỉ fetch khi có token
     * - Chỉ fetch khi user click button
     * - Dependent queries (fetch B sau khi có data từ A)
     */
  });
};
