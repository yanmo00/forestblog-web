<template>
  <div class="mine-wrapper">
    <div class="mine-container">
      <div class="profile-section">
        <div class="profile-header">
          <img src="https://ilogs.cn/usr/uploads/2025/04/968650136.jpg" alt="Profile" class="profile-image">
          <h1 class="profile-name">YunMo</h1>
          <p class="profile-bio">热爱技术，热爱生活</p>
        </div>
        
        <div class="profile-content">
          <div class="content-card">
            <h2>关于我</h2>
            <p class="bio-text">这里是YunMo同学的blog，主要涉及他学习阶段时候的笔记, 一般都是博主个人随笔，没有逻辑且属于造轮子</p>
            <img src="https://moontung.top/usr/themes/VOID/assets/libs/owo/biaoqing/2233/2233E5A898_E5969DE6B0B4.png" alt="emoji" class="bio-emoji">
          </div>

          <div class="content-card contact-card">
            <h2>联系我</h2>
            <p class="contact-text">如果您对网站内容、项目合作或域名出售感兴趣，欢迎通过以下方式联系我：</p>
            <div class="contact-info">
              <el-icon><Message /></el-icon>
              <a href="mailto:yanmo49@gmail.com" class="contact-link">yanmo49@gmail.com</a>
            </div>
            <div class="contact-info">
              <el-icon><Link /></el-icon>
              <a href="https://github.com/yourusername" target="_blank" class="contact-link">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Message, Link } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.mine-wrapper {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.mine-container {
  width: 100%;
  max-width: 1200px;
  margin-left: 18rem;
  margin-top: 0rem;
}

.profile-section {
  background: var(--bg-dark);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-hover);
  }
}

.profile-header {
  position: relative;
  padding: 3rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  color: white;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, var(--bg-dark));
  }
}

.profile-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  background: var(--bg-darker);
  object-fit: cover;
  transition: var(--transition-base);
  margin-bottom: 1.5rem;

  &:hover {
    transform: scale(1.05) rotate(5deg);
    border-color: rgba(255, 255, 255, 0.4);
  }
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.profile-bio {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 1rem 0 0;
}

.profile-content {
  padding: 2rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.content-card {
  background: var(--bg-darker);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--border-color);
  transition: var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-hover);
  }

  h2 {
    color: var(--text-primary);
    font-size: 1.75rem;
    margin: 0 0 1.5rem;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 1.5em;
      background: var(--primary-color);
      border-radius: var(--radius-sm);
    }
  }
}

.bio-text {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.bio-emoji {
  width: 120px;
  height: auto;
  margin: 1rem auto;
  display: block;
  transition: var(--transition-base);

  &:hover {
    transform: scale(1.1) rotate(10deg);
  }
}

.contact-card {
  .contact-text {
    color: var(--text-secondary);
    line-height: 1.8;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: var(--bg-dark);
  border-radius: var(--radius-md);
  transition: var(--transition-base);

  &:hover {
    transform: translateX(8px);
    background: rgba(64, 158, 255, 0.1);
  }

  .el-icon {
    font-size: 1.5rem;
    color: var(--primary-color);
  }
}

.contact-link {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.1rem;
  transition: var(--transition-base);

  &:hover {
    color: var(--primary-color);
  }
}

@media (max-width: 768px) {
  .mine-wrapper {
    padding: 1rem;
  }

  .profile-header {
    padding: 2rem 1rem;

    .profile-image {
      width: 140px;
      height: 140px;
    }

    .profile-name {
      font-size: 2rem;
    }
  }

  .profile-content {
    padding: 1.5rem;
    grid-template-columns: 1fr;
  }

  .content-card {
    padding: 1.5rem;
  }
  
  .profile-section{
    margin-left: -12rem;
    width: 190%;
  }  


}
</style>