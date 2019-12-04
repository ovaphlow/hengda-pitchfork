package hengda.pitchfork

import com.google.gson.Gson
import io.grpc.stub.StreamObserver
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.sql.Connection
import java.sql.Date
import java.sql.ResultSet
import java.sql.Timestamp
import java.text.SimpleDateFormat

class CheLiang004ServiceImpl: CheLiang004Grpc.CheLiang004ImplBase() {
    private val logger: Logger = LoggerFactory.getLogger(CheLiang004ServiceImpl::class.java)

    override fun list(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *
                from cheliangduan.cheliang004
                where reject = ''
                limit 200
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getList(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun save(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                insert into
                    cheliangduan.cheliang004 (
                        dept, leader, leader_phone, operator, operator_phone,
                        train, date_begin, time_begin, date_end, time_end,
                        title, content,
                        p_yq_xdc, p_yq_jcw, p_yq_zydd, p_yq_qt,
                        category, progress
                    )
                    values (
                        ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?,
                        ?, ?,
                        ?, ?, ?, ?,
                        ?, '技术员审核'
                    )
                returning id
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setString(1, body["dept"].toString())
            ps.setString(3, body["leader_phone"].toString())
            ps.setString(4, body["operator"].toString())
            ps.setString(5, body["operator_phone"].toString())
            ps.setString(6, body["train"].toString())
            ps.setString(2, body["leader"].toString())
            ps.setString(7, body["date_begin"].toString())
            ps.setString(8, body["time_begin"].toString())
            ps.setString(9, body["date_end"].toString())
            ps.setString(10, body["time_end"].toString())
            ps.setString(11, body["title"].toString())
            ps.setString(12, body["content"].toString())
            ps.setString(13, body["p_yq_xdc"].toString())
            ps.setString(14, body["p_yq_jcw"].toString())
            ps.setString(15, body["p_yq_zydd"].toString())
            ps.setString(16, body["p_yq_qt"].toString())
            ps.setString(17, body["category"].toString())
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getMap(rs))
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun get(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select * from cheliangduan.cheliang004 where id = ? limit 1
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["id"].toString().toDouble().toInt())
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getMap(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun update(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select * from cheliangduan.cheliang004 where id = ? limit 1
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["id"].toString().toDouble().toInt())
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getMap(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun reject(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update cheliangduan.cheliang004
                set reject = ?
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setString(1, body["reject"].toString())
            ps.setInt(2, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun remove(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                delete from cheliangduan.cheliang004 where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun listReject(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select * from cheliangduan.cheliang004 where reject != ''
                order by id desc limit 200
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getList(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun checkPjsy(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update cheliangduan.cheliang004
                set check_p_jsy = ?, check_p_jsy_id = ?,
                    check_p_jsy_comment = ?, check_p_jsy_team = ?, check_p_jsy_qc = ?,
                    check_p_jsy_date = ?, check_p_jsy_time = ?,
                    progress = '调度审核'
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setString(1, body["p_jsy"].toString())
            ps.setInt(2, body["p_jsy_id"].toString().toDouble().toInt())
            ps.setString(3, body["comment"].toString())
            ps.setString(4, body["team"].toString())
            ps.setString(5, body["qc"].toString())
            ps.setDate(6, java.sql.Date.valueOf(body["date"].toString()))
            ps.setString(7, body["time"].toString())
            ps.setInt(8, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun checkPdd(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update cheliangduan.cheliang004
                set check_p_dd = ?, check_p_dd_id = ?,
                    check_p_dd_date = ?, check_p_dd_time = ?,
                    progress = '值班所长审核'
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setString(1, body["p_dd"].toString())
            ps.setInt(2, body["p_dd_id"].toString().toDouble().toInt())
            ps.setDate(3, java.sql.Date.valueOf(body["date"].toString()))
            ps.setString(4, body["time"].toString())
            ps.setInt(5, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun checkPzbsz(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update cheliangduan.cheliang004
                set check_p_zbsz = ?, check_p_zbsz_id = ?,
                    check_p_zbsz_date = ?, check_p_zbsz_time = ?,
                    progress = ?
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setString(1, body["p_zbsz"].toString())
            ps.setInt(2, body["p_zbsz_id"].toString().toDouble().toInt())
            ps.setDate(3, Date.valueOf(body["date"].toString()))
            ps.setString(4, body["time"].toString())
            ps.setString(5, body["progress"].toString())
            ps.setInt(6, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun checkTeam(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update cheliangduan.cheliang004
                set check_team_id = ?, progress = ?
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["team_id"].toString().toDouble().toInt())
            ps.setString(2, body["progress"].toString());
            ps.setInt(3, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun checkQc(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update cheliangduan.cheliang004
                set check_qc_id = ?, progress = '作业负责人销记'
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["qc_id"].toString().toDouble().toInt())
            ps.setInt(2, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun reviewOperator(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update cheliangduan.cheliang004
                set review_operator = ?, review_operator_id = ?,
                    review_operator_date = ?, review_operator_time = ?,
                    review_operator_report = ?, remark = ?,
                    progress = '工长销记'
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setString(1, body["operator"].toString())
            ps.setInt(2, body["operator_id"].toString().toDouble().toInt())
            ps.setDate(3, Date.valueOf(body["date"].toString()))
            ps.setString(4, body["time"].toString())
            ps.setString(5, body["report"].toString())
            ps.setString(6, body["remark"].toString())
            ps.setInt(7, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun reviewLeader(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                update cheliangduan.cheliang004
                set review_leader = ?, review_leader_id = ?,
                    review_leader_time = ?,
                    progress = '班组销记'
                where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setString(1, body["leader"].toString())
            ps.setInt(2, body["leader_id"].toString().toDouble().toInt())
            ps.setTimestamp(3, Timestamp.valueOf(body["time"].toString()))
            ps.setInt(4, body["id"].toString().toDouble().toInt())
            ps.execute()
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    /**
     * 技术员：审核阶段待处理任务计数
     */
    override fun qtyPjsy(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select count(*) as qty
                from cheliangduan.cheliang004
                where check_p_jsy_id = 0
                    and reject = ''
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getMap(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    /**
     * 技术员：审核阶段待处理任务列表
     */
    override fun listPjsy(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *
                from cheliangduan.cheliang004
                where check_p_jsy_id = 0
                    and reject = ''
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getList(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    /**
     * 调度：审核阶段待处理任务计数
     */
    override fun qtyPdd(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select count(*) as qty
                from cheliangduan.cheliang004
                where check_p_jsy_id > 0
                    and check_p_dd_id = 0
                    and reject = ''
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getMap(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    /**
     * 调度：审核阶段待处理任务列表
     */
    override fun listPdd(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *
                from cheliangduan.cheliang004
                where check_p_jsy_id > 0
                    and check_p_dd_id = 0
                    and reject = ''
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getList(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    /**
     * 值班所长：审核阶段待处理任务计数
     */
    override fun qtyPzbsz(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select count(*) as qty
                from cheliangduan.cheliang004
                where check_p_dd_id > 0
                    and check_p_zbsz_id = 0
                    and reject = ''
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getMap(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    /**
     * 值班所长：审核阶段待处理任务列表
     */
    override fun listPzbsz(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *
                from cheliangduan.cheliang004
                where check_p_dd_id > 0
                    and check_p_zbsz_id = 0
                    and reject = ''
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getList(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    /**
     * 班组：审核阶段待处理任务计数
     */
    override fun qtyTeam(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select count(*) as qty
                from cheliangduan.cheliang004
                where check_p_zbsz_id > 0
                    and position('班组' in check_p_jsy_comment) > 0
                    and check_p_jsy_team = (select v from public.common_data where id = ?)
                    and check_team_id = 0
                    and reject = ''
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["id"].toString().toDouble().toInt())
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getMap(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    /**
     * 班组：审核阶段待处理任务列表
     */
    override fun listTeam(req: CheLiang004Request, responseObserver: StreamObserver<CheLiang004Reply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")
        var conn: Connection? = null

        try {
            conn = DBUtil.getConn()
            val sql: String = """
                select *
                from cheliangduan.cheliang004
                where check_p_zbsz_id > 0
                    and position('班组' in check_p_jsy_comment) > 0
                    and check_p_jsy_team = (select v from public.common_data where id = ?)
                    and check_team_id = 0
                    and reject = ''
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body["id"].toString().toDouble().toInt())
            val rs = ps.executeQuery()
            resp["content"] = DBUtil.getList(rs)
        } catch (e: Exception) {
            e.printStackTrace()
            resp["message"] = "gRPC服务器错误"
        } finally {
            conn!!.close()
        }

        val reply = CheLiang004Reply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }
}
