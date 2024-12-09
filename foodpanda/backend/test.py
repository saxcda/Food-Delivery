import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver

from selenium.webdriver.common.action_chains import ActionChains

def scroll_to_bottom(driver, pause_time=0.5):
    """
    滚动页面到底部，直到无法继续滚动为止。
    """
    original_top = 0  # 定义初始高度
    while True:
        # 向下滚动页面到底部
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(pause_time)  # 暂停，等待页面加载

        # 检查当前页面的滚动距离
        check_height = driver.execute_script(
            "return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop"
        )

        # 如果页面滚动距离没有变化，说明已经到达底部
        if check_height == original_top:
            print("页面已经滚动到底部")
            return check_height
        
        original_top = check_height

def slow_scroll(driver, pause_time=0.5, step=100, max_attempts=1000, image_selector='div.lazy-loaded-dish-photo[data-testid="menu-product-image"]'):
    """
    模擬滾輪緩慢滾動頁面，確保所有圖片已加載
    """
    action = ActionChains(driver)

    print("開始模擬滾輪緩慢滾動到底部...")

    last_height = scroll_to_bottom(driver)
    
    print("到達底部，開始緩慢回滑至頂部...")

    # 從底部模擬滾輪回滑至頂部
    while last_height > 0:
        action.scroll_by_amount(0, -step).perform()
        time.sleep(pause_time)
        last_height -= step
        if last_height < 0:
            last_height = 0  # 確保不會超過頂部

    print("完成來回滑動")

def get_detail():
    """
    抓取網站的餐點資訊，包括名稱、描述、價格及圖片
    """
    options = Options()
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    result = []

    try:
        url = "https://www.foodpanda.com.tw/restaurant/z2tv/xiao-ji-ka-li-tai-bei-ba-de-dian"
        driver.get(url)

        driver.implicitly_wait(10)

        # 滾動頁面以觸發圖片加載
        slow_scroll(driver)

        # 抓取所有類別
        categories = driver.find_elements(By.CSS_SELECTOR, 'div[class="box-flex dish-category-section"]')

        for category in categories:
            try:
                category_name = category.find_element(By.CSS_SELECTOR, 'h2.dish-category-title').text
            except:
                category_name = "無類別名稱"

            dishes = category.find_elements(By.CSS_SELECTOR, 'li[data-testid="menu-product"]')

            for dish in dishes:
                try:
                    name = dish.find_element(By.CSS_SELECTOR, 'span[data-testid="menu-product-name"]').text
                except:
                    name = "無名稱"

                try:
                    description = dish.find_element(By.CSS_SELECTOR, 'p[data-testid="menu-product-description"]').text
                except:
                    description = "無描述"

                try:
                    price = dish.find_element(By.CSS_SELECTOR, 'p[data-testid="menu-product-price"]').text
                except:
                    price = "無現價"

                try:
                    original_price = dish.find_element(By.CSS_SELECTOR, 'span[data-testid="menu-product-price-before-discount"]').text
                except:
                    original_price = "無原價"

                try:
                    style = dish.find_element(By.CSS_SELECTOR, 'div.lazy-loaded-dish-photo[data-testid="menu-product-image"]').get_attribute("style")
                    image_url = style.split('url("')[1].split('")')[0] if 'url(' in style else "無圖片"
                except Exception as e:
                    print(f"抓取圖片時發生錯誤: {e}")
                    image_url = "error"

                result.append({
                    "類別名稱": category_name,
                    "餐點名稱": name,
                    "描述": description,
                    "折扣價": price,
                    "原價": original_price,
                    "圖片": image_url
                })

    except Exception as e:
        print(f"發生錯誤: {e}")
    finally:
        driver.quit()

    return result

# 主程式入口
if __name__ == "__main__":
    details = get_detail()
    for item in details:
        print(item)
