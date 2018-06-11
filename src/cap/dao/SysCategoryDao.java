package cap.dao;

import java.util.List;

import cap.bean.SysCategory;

public interface SysCategoryDao {

	/*
	 * 查询所有系统分类
	 */
	public abstract List<SysCategory> getAllSysCategory();

	public abstract SysCategory getById(int id);

	/**
	 * 删除系统分类
	 */
	public abstract int deleteSysCategory(int scgId);

	/**
	 * 根据name来查询分类记录
	 */
	public abstract SysCategory getByName(String scgName);

	/**
	 * 创建一条分类记录
	 */
	public abstract int insertSysCategory(String scgName);

	/**
	 * 更新系统分类名
	 */
	public abstract int updateSysCategory(int scgId, String scgName);

	/*
	 * 分页
	 */
	public abstract List<SysCategory> getSysCategoryByPage(int curPage, int size);

	/*
	 * 计算分类的总数
	 */
	public abstract int count();

}