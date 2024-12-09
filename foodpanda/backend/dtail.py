import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


def getDetail():
    # 設定瀏覽器選項
    options = Options()
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
    # 可選：啟用無頭模式（不顯示瀏覽器視窗）
    # options.add_argument("--headless")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    result = []  # 用於儲存結果的列表
    seen_dishes = {}  # 用於追蹤餐點名稱及其索引

    try:
        # 開啟目標網站
        url = "https://www.foodpanda.com.tw/restaurant/z2tv/xiao-ji-ka-li-tai-bei-ba-de-dian"
        driver.get(url)

        # 等待頁面加載 (簡單處理)
        driver.implicitly_wait(10)

        # 模擬滾動頁面加載更多資料
        for _ in range(3):  # 滾動 3 次
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(random.uniform(2, 5))  # 隨機延遲

        # 抓取所有類別
        categories = driver.find_elements(By.CSS_SELECTOR, 'div[class="box-flex dish-category-section"]')

        # 解析每個類別
        for category in categories:
            # 抓取類別名稱
            try:
                category_name = category.find_element(By.CSS_SELECTOR, 'h2.dish-category-title').text
            except:
                category_name = "無類別名稱"

            # 抓取該類別下的所有餐點
            dishes = category.find_elements(By.CSS_SELECTOR, 'li[data-testid="menu-product"]')

            for dish in dishes:
                # 餐點名稱
                try:
                    name = dish.find_element(By.CSS_SELECTOR, 'span[data-testid="menu-product-name"]').text
                except:
                    name = "無名稱"

                # 餐點描述
                try:
                    description = dish.find_element(By.CSS_SELECTOR, 'p[data-testid="menu-product-description"]').text
                except:
                    description = "無描述"

                # 餐點現價
                try:
                    price = dish.find_element(By.CSS_SELECTOR, 'p[data-testid="menu-product-price"]').text
                except:
                    price = "無現價"

                # 餐點原價
                try:
                    original_price = dish.find_element(By.CSS_SELECTOR, 'span[data-testid="menu-product-price-before-discount"]').text
                except:
                    original_price = "無原價"

                # 餐點圖片
                try:
                    style = dish.find_element(By.CLASS_NAME, 'lazy-loaded-dish-photo').get_attribute("style")
                    if 'url(' in style:
                        image_url = style.split('url("')[1].split('")')[0]
                    else:
                        image_url = "無圖片"
                except:
                    image_url = "無圖片"

                # 打印圖片 URL（測試用，可移除）
                print(image_url)

                # 檢查重複項
                if name in seen_dishes:
                    index = seen_dishes[name]
                    if category_name == "人氣精選✨":
                        # 當前是人氣精選，刪除該條目
                        continue
                    else:
                        # 修改已存在的 "is Pri"
                        result[index]["is Pri"] = True
                else:
                    # 儲存新餐點資訊
                    result.append({
                        "類別名稱": category_name,
                        "餐點名稱": name,
                        "描述": description,
                        "折扣價": price,
                        "原價": original_price,
                        "圖片": image_url,
                        "is Pri": category_name == "人氣精選✨"
                    })
                    seen_dishes[name] = len(result) - 1

    except Exception as e:
        print(f"發生錯誤: {e}")
    finally:
        # 關閉瀏覽器
        driver.quit()

    return result  # 返回結果


# 主程式入口
if __name__ == "__main__":
    details = getDetail()
    for item in details:
        print(item)
